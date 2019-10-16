import { createAction } from 'redux-actions';
import { strEnum } from '../../../../types';
import { Pokemon } from '../../../../types/pokeapi';
import { PokemonTileItem } from '../../../components/pokemon-tile';

export const PokemonCompareReduxActions = strEnum([
  'PUSH_POKEMON_COMPARE_CANDIDATE',
  'SET_POKEMON_COMPARE_CURRENT',
  'CLEAR_POKEMON_COMPARE_CANDIDATES',
  'CLEAR_POKEMON_COMPARE_CURRENT',
]);

export interface CompareItem<T> {
  field: 'a' | 'b';
  item: T;
}

export const pushPokemonCompareCandidateAction = createAction<PokemonTileItem>(
  PokemonCompareReduxActions.PUSH_POKEMON_COMPARE_CANDIDATE
);
export const setPokemonCompareCurrentAction = createAction<
  CompareItem<Pokemon>
>(PokemonCompareReduxActions.SET_POKEMON_COMPARE_CURRENT);
export const clearPokemonCompareCandidatesAction = createAction<void>(
  PokemonCompareReduxActions.CLEAR_POKEMON_COMPARE_CURRENT
);
export const clearPokemonCompareCurrentAction = createAction<void>(
  PokemonCompareReduxActions.CLEAR_POKEMON_COMPARE_CURRENT
);

export type PokemonCompareActions =
  | ReturnType<typeof pushPokemonCompareCandidateAction>
  | ReturnType<typeof setPokemonCompareCurrentAction>
  | ReturnType<typeof clearPokemonCompareCandidatesAction>
  | ReturnType<typeof clearPokemonCompareCurrentAction>;
