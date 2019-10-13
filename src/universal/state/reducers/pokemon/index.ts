import produce from 'immer';
import { Action } from 'redux';
import { PokemonActions, PokemonReduxActions } from '../../actions';
import { IState } from '../../store';
import { Pokemon, NamedAPIResource } from '../../../../types/pokeapi';

export const initialState: IState['pokemon'] = {
  page: 0,
};

type LoaderProducerReducerType = (
  d: IState['pokemon'],
  a: PokemonActions
) => void;

export const pokemonProduced = produce<LoaderProducerReducerType>(
  (draftState, action) => {
    switch (action.type) {
      case PokemonReduxActions.SET_POKEMON:
        draftState.current = action.payload as Pokemon;
        return;
      case PokemonReduxActions.SET_POKEMON_LIST:
        draftState.list = action.payload as NamedAPIResource[];
      case PokemonReduxActions.SET_POKEMON_LIST_PAGE:
        draftState.page = action.payload as number;
        return;
      default:
        return;
    }
  }
);

export function pokemon(
  state = initialState,
  action: PokemonActions
): IState['pokemon'] {
  return pokemonProduced(state, action);
}
