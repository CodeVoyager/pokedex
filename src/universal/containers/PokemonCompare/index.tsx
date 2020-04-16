import { fold as foldEither } from 'fp-ts/lib/Either';
import {
  fold as foldOption,
  fromNullable as optionFromNullable,
} from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Action, Dispatch } from 'redux';
import { Pokemon } from '../../../types/pokeapi';
import { Button } from '../../components/button';
import { ButtonsContainer } from '../../components/buttons-container';
import { PokemonDetails } from '../../components/pokemon-details';
import { PokemonService } from '../../service/pokeapi';
import {
  setErrorAction,
  startLoadingAction,
  stopLoadingAction,
} from '../../state/actions';
import { setPokemonCompareCurrentAction } from '../../state/actions/pokemon-compare';
import { compareCurrent, isLoading } from '../../state/selectors';
import './index.css';

interface PokemonCompareProps extends RouteComponentProps<{ aId: string; bId: string }> {}

export const notFoundMessage = (
  <div className="pokemon-not-found">Pokemon not found ;_;</div>
);

export type ValidField = keyof ReturnType<typeof compareCurrent>;

export function renderItem(el?: Pokemon) {
  return pipe(
    el,
    optionFromNullable,
    foldOption(
      () => notFoundMessage,
      p => <PokemonDetails key={p.id} k={p.id} pokemon={p} />
    )
  );
}

function get(dispatch: Dispatch, field: ValidField, id: Pokemon['id']) {
  dispatch(startLoadingAction());

  return PokemonService.get(id)().then(p => {
    pipe(
      p,
      foldEither<Error, Pokemon, Action>(
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

export function candidateShouldBeLoaded(
  compared: ReturnType<typeof compareCurrent>
) {
  return (f: ValidField) => (id: number) =>
    !compared[f] || compared[f]!.id !== id;
}

export function PokemonCompare({ history, match: { params } }: PokemonCompareProps) {
  const aId = parseInt(params.aId, 10);
  const bId = parseInt(params.bId, 10);
  const compared = useSelector(compareCurrent);
  const shouldBeLoaded = candidateShouldBeLoaded(compared);
  const showLoading = useSelector(isLoading);
  const aElement = renderItem(compared.a);
  const bElement = renderItem(compared.b);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldBeLoaded('a')(aId)) {
      get(dispatch, 'a', aId);
    }
    if (shouldBeLoaded('b')(bId)) {
      get(dispatch, 'b', bId);
    }
  });

  return showLoading ? null : (
    <div className="pokemon-compare">
      <div className="pokemon-compare-items">
        {aElement}
        {bElement}
      </div>
      <div className="pokemon-compare-controls">
        <ButtonsContainer>
          <Button onClick={() => history.push('/pokemon')}>Go back</Button>
        </ButtonsContainer>
      </div>
    </div>
  );
}
