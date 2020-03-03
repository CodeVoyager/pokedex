import { fold as foldEither } from 'fp-ts/lib/Either';
import {
  fold as foldOption,
  fromNullable as optionFromNullable
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
import {
  compareCandidates,
  compareCurrent,
  isLoading,
} from '../../state/selectors';
import './index.css';

interface Props extends RouteComponentProps {}

export const notFoundMessage = (
  <div className="pokemon-not-found">Pokemon not found ;_;</div>
);

export type ValidField = 'a' | 'b';

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

function get(dispatch: Dispatch, field: ValidField, id: string) {
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
  compared: ReturnType<typeof compareCurrent>,
  candidates: ReturnType<typeof compareCandidates>
) {
  return (f: ValidField) =>
    !compared[f] ||
    (compared[f] && compared[f]!.id.toString() !== candidates[f]!.id);
}

export function PokemonCompare({ history }: Props) {
  const compared = useSelector(compareCurrent);
  const candidates = useSelector(compareCandidates);
  const shouldBeLoaded = candidateShouldBeLoaded(compared, candidates);
  const showLoading = useSelector(isLoading);
  const aElement = renderItem(compared.a);
  const bElement = renderItem(compared.b);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldBeLoaded('a')) {
      get(dispatch, 'a', candidates.a!.id);
    }
    if (shouldBeLoaded('b')) {
      get(dispatch, 'b', candidates.b!.id);
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
