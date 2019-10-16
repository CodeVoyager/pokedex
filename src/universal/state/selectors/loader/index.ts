import { State } from '../../store';

export function isLoading(state: State) {
  return state.loader.isLoading;
}
