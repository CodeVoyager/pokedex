import { fold } from 'fp-ts/lib/Either';
import { fold as optionFold, fromNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React, { useEffect, useDebugValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { PokemonResponse } from '../../../types/pokeapi';
import { Button } from '../../components/button';
import { ButtonsContainer } from '../../components/buttons-container';
import { PokemonCompareMini } from '../../components/pokemon-compare-mini';
import { PokemonTileItem } from '../../components/pokemon-tile';
import { PokemonTilesContainer } from '../../components/pokemon-tiles-container';
import { ITEMS_PER_PAGE, PokemonService } from '../../service/pokeapi';
import {
  setErrorAction,
  setPokemonListAction,
  setPokemonListPageAction,
  stopLoadingAction,
} from '../../state/actions';
import { pushPokemonCompareCandidateAction } from '../../state/actions/pokemon-compare';
import {
  compareCandidates,
  isLoading,
  pokemonList,
  pokemonListPage,
} from '../../state/selectors';
import './index.css';

export function pushToCompare(p: PokemonTileItem) {
  const dispatch = useDispatch();
  return () => {
    dispatch(pushPokemonCompareCandidateAction(p));
  };
}
export function renderPokemons(ps: ReturnType<typeof pokemonList>) {
  return pipe(
    ps,
    fromNullable,
    optionFold(
      () => null,
      ps => {
        const pokemons = ps.map(({ name, url }) => {
          const id = pipe(
            url.split('/'),
            ns => fromNullable(ns[ns.length - 2]),
            optionFold(() => -1, s => parseInt(s, 10))
          );

          return { name, id };
        });

        return (
          <PokemonTilesContainer
            onCompareClick={pushToCompare}
            pokemons={pokemons}
          />
        );
      }
    )
  );
}

export function getPage(dispatch: Dispatch, page: number) {
  return () => {
    return PokemonService.list(page)().then(ps => {
      pipe(
        ps,
        fold<Error, PokemonResponse, Action>(
          e => {
            return setErrorAction(e);
          },
          ps => {
            return setPokemonListAction(ps.results);
          }
        ),
        action => {
          dispatch(action);
          dispatch(setPokemonListPageAction(page));
          dispatch(stopLoadingAction());
        }
      );
    });
  };
}

export function PokemonList() {
  const showLoader = useSelector(isLoading);
  const list = useSelector(pokemonList);
  const page = useSelector(pokemonListPage);
  const candidates = useSelector(compareCandidates);
  const pokemons = renderPokemons(list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!list) {
      getPage(dispatch, page)();
    }
  });

  return (
    <div className="pokemon-list">
      {showLoader ? null : (
        <>
          {pokemons}
          <div className="pokemon-list-controls">
            <ButtonsContainer>
              <>
                {list && page > 0 ? (
                  <Button onClick={getPage(dispatch, page - 1)}>
                    Previous page
                  </Button>
                ) : null}
                {list && list.length === ITEMS_PER_PAGE ? (
                  <Button onClick={getPage(dispatch, page + 1)}>
                    Next page
                  </Button>
                ) : null}
              </>
            </ButtonsContainer>
          </div>
          <div className="pokemon-list-compare">
            <PokemonCompareMini {...candidates} />
          </div>
        </>
      )}
    </div>
  );
}
