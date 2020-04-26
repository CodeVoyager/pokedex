import { fold as foldEither } from 'fp-ts/lib/either';
import { none, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { Pokemon as ApiPokemon, Pokemon } from '../../../types/pokeapi';
import { Button } from '../../components/button';
import { ButtonsContainer } from '../../components/buttons-container';
import { PokemonDetails } from '../../components/pokemon-details';
import { PokemonService } from '../../service/pokeapi';
import {
  setErrorAction,
  SetErrorAction,
  setPokemonAction,
  SetPokemonAction,
  startLoadingAction,
  stopLoadingAction,
  AllActions,
} from '../../state/actions';
import { pokemon as pokemonDetails } from '../../state/selectors';
import { withTitle } from '../../wrappers/head';
import { withRouteData } from '../../wrappers/route-data';

export interface PokemonRouteParams {
  id: string;
}

export interface PokemonContentProps {
  pokemon: Pokemon;
  history: PokemonProps['history'];
}

interface PokemonProps extends RouteComponentProps<PokemonRouteParams> {}

export function PokemonPage({
  match: {
    params: { id },
  },
  history,
}: PokemonProps) {
  const pokemonId = parseInt(id, 10);
  const dispatch = useDispatch();

  return pipe(
    PokemonPageContent,
    withTitle('Pokemon'),
    withRouteData(
      dataGetter(pokemonId, history),
      getActionDispatcher(dispatch, pokemonId)
    )
  );
}

export function PokemonPageContent({ pokemon, history }: PokemonContentProps) {
  return (
    <div className="pokemon">
      <PokemonDetails pokemon={pokemon} />
      <div className="pokemon-list-controls">
        <ButtonsContainer>
          <Button onClick={() => history.push('/pokemon')}>Go back</Button>
        </ButtonsContainer>
      </div>
    </div>
  );
}

export function dataGetter(id: number, history: PokemonProps['history']) {
  return () => {
    const pokemon = useSelector(pokemonDetails);

    if (!pokemon || pokemon.id !== id) {
      return none;
    }

    return some({ pokemon, history });
  };
}

export function getActionDispatcher(
  dispatch: Dispatch<AllActions>,
  id: ApiPokemon['id']
) {
  return function actionDispatcher() {
    dispatch(startLoadingAction());

    return PokemonService.get(id)().then(p => {
      return pipe(
        p,
        foldEither<Error, ApiPokemon, SetErrorAction | SetPokemonAction>(
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

          return action;
        }
      );
    });
  };
}