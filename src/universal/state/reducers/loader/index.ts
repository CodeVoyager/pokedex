import produce from 'immer';
import { LoaderActions, LoaderReduxActions } from '../../actions';
import { State } from '../../store';

export const initialState: State['loader'] = {
  count: 0,
  isLoading: false,
};

type LoaderProducerReducerType = (d: State['loader'], a: LoaderActions) => void;

export const loaderProduced = produce<LoaderProducerReducerType>(
  (draftState, action) => {
    switch (action.type) {
      case LoaderReduxActions.START_LOADING:
        draftState.count += 1;
        draftState.isLoading = !!draftState.count;
        return;
      case LoaderReduxActions.STOP_LOADING:
        draftState.count -= 1;
        draftState.isLoading = !!Math.max(draftState.count, 0);
        return;
      default:
        return;
    }
  }
);

export function loader(
  state = initialState,
  action: LoaderActions
): State['loader'] {
  return loaderProduced(state, action);
}
