import { IState } from '../../store';

export function pokemonList(state: IState) {
  return state.pokemon.list;
}

export function pokemonListPage(state: IState) {
  return state.pokemon.page;
}

export function pokemon(state: IState) {
  return state.pokemon.current;
}
