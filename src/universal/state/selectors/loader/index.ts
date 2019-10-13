import { IState } from '../../store';

export function isLoading(state: IState) {
  return state.loader.isLoading;
}
