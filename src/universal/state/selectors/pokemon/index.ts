import { State } from '../../store';

export function pokemonList(state: State) {
  return state.pokemon.list;
}

export function pokemonListPage(state: State) {
  return state.pokemon.page;
}

export function pokemon(state: State) {
  return state.pokemon.current;
}
