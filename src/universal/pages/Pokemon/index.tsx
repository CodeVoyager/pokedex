import { fold as foldEither } from 'fp-ts/lib/either';
import { none, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { Dispatch } from 'redux';
import { Pokemon as ApiPokemon, Pokemon } from '../../../types/pokeapi';
import { Button } from '../../components/button';
import { ButtonsContainer } from '../../components/buttons-container';
import { PokemonDetails } from '../../components/pokemon-details';
import { PokemonService } from '../../service/pokeapi';
import {
  AllActions,
  setErrorAction,
  SetErrorAction,
  setPokemonAction,
  SetPokemonAction,
  startLoadingAction,
  stopLoadingAction,
} from '../../state/actions';
import { pokemon as pokemonDetails } from '../../state/selectors';
import { withTitle } from '../../wrappers/head';
import { withRouteData } from '../../wrappers/route-data';

export interface PokemonRouteParams {
  id: string;
}

export interface PokemonContentProps {
  pokemon: Pokemon;
}

interface PokemonProps extends RouteComponentProps<PokemonRouteParams> {}

export function PokemonPage({
  match: {
    params: { id },
  },
}: PokemonProps) {
  const pokemonId = parseInt(id, 10);
  const dispatch = useDispatch();

  return pipe(
    PokemonPageContent,
    withTitle('Pokemon'),
    withRouteData(
      dataGetter(pokemonId),
      getActionDispatcher(dispatch, pokemonId)
    )
  );
}

export function PokemonPageContent({ pokemon }: PokemonContentProps) {
  const history = useHistory();

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

export function dataGetter(id: number) {
  return () => {
    const pokemon = useSelector(pokemonDetails);

    if (!pokemon || pokemon.id !== id) {
      return none;
    }

    return some({ pokemon });
  };
}

export function getActionDispatcher(
  dispatch: Dispatch<AllActions>,
  id: ApiPokemon['id']
) {
  return function actionDispatcher() {
    dispatch(startLoadingAction());

    return PokemonService.get(id)()
      .then(p => {
        return pipe(
          p,
          foldEither<Error, ApiPokemon, SetErrorAction | SetPokemonAction>(
            e => {
              return setErrorAction(e.message);
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
      })
      .then(action => [action]);
  };
}
