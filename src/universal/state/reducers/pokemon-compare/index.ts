import { Pokemon } from '../../../../types/pokeapi';
import { PokemonTileItem } from '../../../components/pokemon-tile';
import {
  CompareItem,
  PokemonCompareActions,
  PokemonCompareReduxActions,
} from '../../actions/pokemon-compare';
import { State } from '../../store';

export type StatePart = State['pokemonCompare'];

export const initialState: StatePart = {
  candidates: {},
  current: {},
};

export function pokemonCompare(
  state = initialState,
  action: PokemonCompareActions
): StatePart {
  switch (action.type) {
    case PokemonCompareReduxActions.CLEAR_POKEMON_COMPARE_CANDIDATES: {
      return {
        ...state,
        candidates: {},
      };
    }
    case PokemonCompareReduxActions.CLEAR_POKEMON_COMPARE_CURRENT: {
      return {
        ...state,
        current: {},
      };
    }
    case PokemonCompareReduxActions.PUSH_POKEMON_COMPARE_CANDIDATE: {
      const {
        candidates: { b },
      } = state;

      return {
        ...state,
        candidates: {
          a: b,
          b: action.payload as PokemonTileItem,
        },
      };
    }
    case PokemonCompareReduxActions.SET_POKEMON_COMPARE_CURRENT: {
      return {
        ...state,
        current: {
          ...state.current,
          [(action.payload as CompareItem<Pokemon>)
            .field]: (action.payload as CompareItem<Pokemon>).item,
        },
      };
    }
    default:
      return state;
  }
}
