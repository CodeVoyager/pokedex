import produce from 'immer';
import { NamedAPIResource, Pokemon } from '../../../../types/pokeapi';
import { PokemonActions, PokemonReduxActions } from '../../actions';
import { State } from '../../store';

export type StatePart = State['pokemon'];

export const initialState: StatePart = {
  page: 0,
};

type LoaderProducerReducerType = (d: StatePart, a: PokemonActions) => void;

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
): StatePart {
  return pokemonProduced(state, action);
}
