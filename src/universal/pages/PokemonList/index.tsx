import { fold as foldEither } from 'fp-ts/lib/either';
import { fold as foldOption, fromNullable, none, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { PokemonResponse } from '../../../types/pokeapi';
import { ButtonsContainer } from '../../components/buttons-container';
import { PokemonCompareMini } from '../../components/pokemon-compare-mini';
import { PokemonTileItem } from '../../components/pokemon-tile';
import { PokemonTilesContainer } from '../../components/pokemon-tiles-container';
import { ITEMS_PER_PAGE, PokemonService } from '../../service/pokeapi';
import {
  AllActions,
  pushPokemonCompareCandidateAction,
  setErrorAction,
  SetErrorAction,
  setPokemonListAction,
  SetPokemonListAction,
  setPokemonListPageAction,
  startLoadingAction,
  stopLoadingAction,
} from '../../state/actions';
import {
  compareCandidates,
  pokemonList,
  pokemonListPage,
} from '../../state/selectors';
import { withTitle } from '../../wrappers/head';
import { withRouteData } from '../../wrappers/route-data';
import './index.css';

export interface PokemonRouteParams {
  page: string;
}

type PokemonListProps = RouteComponentProps<PokemonRouteParams>;

export function PokemonListPage({
  match: {
    params: { page: pageFromRoute },
  },
}: PokemonListProps) {
  const page = parseInt(pageFromRoute, 10);
  const dispatch = useDispatch();

  return pipe(
    PokemonPageContent,
    withTitle('Pokemon List'),
    withRouteData(dataGetter(page), getActionDispatcher(dispatch, page))
  );
}

export function PokemonPageContent() {
  const list = useSelector(pokemonList);
  const page = useSelector(pokemonListPage);
  const candidates = useSelector(compareCandidates);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const pokemons = list!.map(({ name, url }) => {
    const id = pipe(
      url.split('/'),
      ns => fromNullable(ns[ns.length - 2]),
      foldOption(
        () => -1,
        s => parseInt(s, 10)
      )
    );

    return { name, id };
  });

  return (
    <div className="pokemon-list">
      <>
        <PokemonTilesContainer
          onCompareClick={pushToCompare}
          pokemons={pokemons}
        />
        <div className="pokemon-list-controls">
          <ButtonsContainer>
            <>
              {page > 1 ? (
                <Link className="pokemon-button" to={getPage(page - 1)}>
                  Previous page
                </Link>
              ) : null}
              {list?.length === ITEMS_PER_PAGE ? (
                <Link className="pokemon-button" to={getPage(page + 1)}>
                  Next page
                </Link>
              ) : null}
            </>
          </ButtonsContainer>
        </div>
        <div className="pokemon-list-compare">
          <PokemonCompareMini {...candidates} />
        </div>
      </>
    </div>
  );
}

function getPage(page: number) {
  return `/pokemon/${page}`;
}

export function pushToCompare(p: PokemonTileItem) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  return () => {
    dispatch(pushPokemonCompareCandidateAction(p));
  };
}

export function dataGetter(currentPage: number) {
  return () => {
    const list = useSelector(pokemonList);
    const page = useSelector(pokemonListPage);

    if (page !== currentPage || !list || !list.length) {
      return none;
    }

    return some({ list });
  };
}

export function getActionDispatcher(
  dispatch: Dispatch<AllActions>,
  page: number
) {
  return function actionDispatcher() {
    dispatch(startLoadingAction());

    return PokemonService.list(page - 1)().then(ps => {
      return pipe(
        ps,
        foldEither<
          Error,
          PokemonResponse,
          SetErrorAction | SetPokemonListAction
        >(
          e => {
            return setErrorAction(e.message);
          },
          ps => {
            return setPokemonListAction(ps.results);
          }
        ),
        actionPokemonsList => {
          const setPageAction = setPokemonListPageAction(page);

          dispatch(actionPokemonsList);
          dispatch(setPageAction);
          dispatch(stopLoadingAction());

          return [actionPokemonsList, setPageAction];
        }
      );
    });
  };
}
