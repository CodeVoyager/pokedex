import { fold } from 'fp-ts/lib/Either';
import { none, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { Action, Dispatch } from 'redux';
import { Pokemon } from '../../../types/pokeapi';
import { Button } from '../../components/button';
import { ButtonsContainer } from '../../components/buttons-container';
import { PokemonDetails } from '../../components/pokemon-details';
import { PokemonService } from '../../service/pokeapi';
import {
  setErrorAction,
  setPokemonCompareCurrentAction,
  startLoadingAction,
  stopLoadingAction,
} from '../../state/actions';
import { compareCurrent } from '../../state/selectors';
import { State } from '../../state/store';
import { withTitle } from '../../wrappers/head';
import { withRouteData } from '../../wrappers/route-data';

import './index.css';

export interface PokemonCompareProps
  extends RouteComponentProps<{ aId: string; bId: string }> {}

export type ValidField = keyof State['pokemonCompare']['current'];

export function dataGetter(aId: number, bId: number) {
  return function getData() {
    const currentCompare = useSelector(compareCurrent);
    const { a, b } = currentCompare;

    if (candidateShouldBeLoaded(a, aId)) {
      return none;
    }

    if (candidateShouldBeLoaded(b, bId)) {
      return none;
    }

    return some({ a, b });
  };
}

export function getActionDispatcher(
  dispatch: Dispatch,
  aId: number,
  bId: number,
  currentCompare: State['pokemonCompare']['current']
) {
  return function actionDispatcher() {
    const { a, b } = currentCompare;
    const promises = [];

    if (candidateShouldBeLoaded(a, aId)) {
      promises.push(get(dispatch, 'a', aId));
    }

    if (candidateShouldBeLoaded(b, bId)) {
      promises.push(get(dispatch, 'b', bId));
    }

    return Promise.all(promises);
  };
}

export function candidateShouldBeLoaded(
  compared: ReturnType<typeof compareCurrent>['a'],
  id: number
) {
  return !compared || compared!.id !== id;
}

function get(dispatch: Dispatch, field: ValidField, id: Pokemon['id']) {
  dispatch(startLoadingAction());

  return PokemonService.get(id)().then(p => {
    pipe(
      p,
      fold<Error, Pokemon, Action>(
        e => {
          return setErrorAction(e);
        },
        p => {
          return setPokemonCompareCurrentAction({
            field,
            item: p,
          });
        }
      ),
      action => {
        dispatch(action);
        dispatch(stopLoadingAction());
      }
    );
  });
}

function PokemonCompareContent({ a, b }: State['pokemonCompare']['current']) {
  const history = useHistory();

  return (
    <div className="pokemon-compare">
      <div className="pokemon-compare-items">
        {[a!, b!].map(pokemon => (
          <PokemonDetails key={pokemon.id} k={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="pokemon-compare-controls">
        <ButtonsContainer>
          <Button onClick={() => history.push('/pokemon')}>Go back</Button>
        </ButtonsContainer>
      </div>
    </div>
  );
}

export function PokemonComparePage({
  match: {
    params: { aId, bId },
  },
}: PokemonCompareProps) {
  const pokemonAId = parseInt(aId, 10);
  const pokemonBId = parseInt(bId, 10);
  const dispatch = useDispatch();
  const currentCompare = useSelector(compareCurrent);

  return pipe(
    PokemonCompareContent,
    withTitle('Pokemon Compare'),
    withRouteData(
      dataGetter(pokemonAId, pokemonBId),
      getActionDispatcher(dispatch, pokemonAId, pokemonBId, currentCompare)
    )
  );
}
