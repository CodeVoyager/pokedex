import { strEnum } from '../../../../types';
import { createAction } from 'redux-actions';
import { NamedAPIResource, Pokemon } from '../../../../types/pokeapi';

export const PokemonReduxActions = strEnum([
  'SET_POKEMON_LIST_PAGE',
  'SET_POKEMON_LIST',
  'SET_POKEMON',
]);

export const setPokemonListPageAction = createAction<number>(
  PokemonReduxActions.SET_POKEMON_LIST_PAGE
);
export const setPokemonListAction = createAction<
  NamedAPIResource[] | undefined | null
>(PokemonReduxActions.SET_POKEMON_LIST);
export const setPokemonAction = createAction<Pokemon>(
  PokemonReduxActions.SET_POKEMON
);

export type SetPokemonAction = ReturnType<typeof setPokemonAction>;

export type PokemonActions =
  | ReturnType<typeof setPokemonListPageAction>
  | ReturnType<typeof setPokemonListAction>
  | SetPokemonAction;
