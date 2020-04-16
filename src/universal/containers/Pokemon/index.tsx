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
import { Pokemon as ApiPokemon } from '../../../types/pokeapi';
import { Button } from '../../components/button';
import { ButtonsContainer } from '../../components/buttons-container';
import { PokemonDetails } from '../../components/pokemon-details';
import { PokemonService } from '../../service/pokeapi';
import {
  setErrorAction,
  setPokemonAction,
  startLoadingAction,
  stopLoadingAction,
} from '../../state/actions';
import { isLoading, pokemon as pokemonDetails } from '../../state/selectors';

export interface PokemonRouteParams {
  id: string;
}

interface PokemonProps extends RouteComponentProps<PokemonRouteParams> {}

export const notFoundMessage = (
  <div className="pokemon-not-found">Pokemon not found ;_;</div>
);

function get(dispatch: Dispatch, id: ApiPokemon['id']) {
  dispatch(startLoadingAction());

  return PokemonService.get(id)().then(p => {
    pipe(
      p,
      foldEither<Error, ApiPokemon, Action>(
        e => {
          return setErrorAction(e);
        },
        p => {
          return setPokemonAction(p);
        }
      ),
      action => {
        dispatch(action);
        dispatch(stopLoadingAction());
      }
    );
  });
}

export function Pokemon({
  match: {
    params: { id },
  },
  history,
}: PokemonProps) {
  const pokemonId = parseInt(id, 10);
  const pokemon = useSelector(pokemonDetails);
  const showLoader = useSelector(isLoading);
  const content = pipe(
    pokemon,
    optionFromNullable,
    foldOption(() => notFoundMessage, p => <PokemonDetails pokemon={p} />)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!pokemon || pokemon.id !== pokemonId) {
      get(dispatch, pokemonId);
    }
  }, []);

  return showLoader ? null : (
    <div className="pokemon">
      {content}
      <div className="pokemon-list-controls">
        <ButtonsContainer>
          <Button onClick={() => history.push('/pokemon')}>Go back</Button>
        </ButtonsContainer>
      </div>
    </div>
  );
}
