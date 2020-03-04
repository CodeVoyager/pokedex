import { NamedAPIResource, Pokemon } from '../../../../types/pokeapi';
import { PokemonActions, PokemonReduxActions } from '../../actions';
import { State } from '../../store';

export type StatePart = State['pokemon'];

export const initialState: StatePart = {
  page: 0,
};

export function pokemon(
  state = initialState,
  action: PokemonActions
): State['pokemon'] {
  switch (action.type) {
    case PokemonReduxActions.SET_POKEMON: {
      return {
        ...state,
        current: action.payload as Pokemon,
      };
    }
    case PokemonReduxActions.SET_POKEMON_LIST: {
      return {
        ...state,
        list: action.payload as NamedAPIResource[],
      };
    }
    case PokemonReduxActions.SET_POKEMON_LIST_PAGE: {
      return {
        ...state,
        page: action.payload as number,
      };
    }
    default: {
      return state;
    }
  }
}
