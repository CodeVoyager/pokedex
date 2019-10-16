import { State } from '../../store';

export function compareCurrent(state: State) {
  return state.pokemonCompare.current;
}

export function compareCandidates(state: State) {
  return state.pokemonCompare.candidates;
}
