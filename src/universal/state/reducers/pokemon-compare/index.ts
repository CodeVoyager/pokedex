import produce from 'immer';
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

type comparePokemonsReducerType = (
  d: StatePart,
  a: PokemonCompareActions
) => void;

export const pokemonCompareProduced = produce<comparePokemonsReducerType>(
  (draftState, action) => {
    switch (action.type) {
      case PokemonCompareReduxActions.CLEAR_POKEMON_COMPARE_CANDIDATES:
        draftState.candidates = {};
        return;
      case PokemonCompareReduxActions.CLEAR_POKEMON_COMPARE_CURRENT:
        draftState.current = {};
        return;
      case PokemonCompareReduxActions.PUSH_POKEMON_COMPARE_CANDIDATE:
        const { b } = draftState.candidates;

        draftState.candidates.a = b;
        draftState.candidates.b = action.payload as PokemonTileItem;
        return;
      case PokemonCompareReduxActions.SET_POKEMON_COMPARE_CURRENT:
        draftState.current[
          (action.payload as CompareItem<Pokemon>).field
        ] = (action.payload as CompareItem<Pokemon>).item;
        return;
      default:
        return;
    }
  }
);

export function pokemonCompare(
  state = initialState,
  action: PokemonCompareActions
): StatePart {
  return pokemonCompareProduced(state, action);
}
