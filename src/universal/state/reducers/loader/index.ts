import { LoaderActions, LoaderReduxActions } from '../../actions';
import { State } from '../../store';

export const initialState: State['loader'] = {
  count: 0,
  isLoading: false,
};

export function loader(state = initialState, action: LoaderActions) {
  switch (action.type) {
    case LoaderReduxActions.START_LOADING: {
      const count = state.count + 1;
      const isLoading = count > 0;

      return {
        count,
        isLoading,
      };
    }
    case LoaderReduxActions.STOP_LOADING: {
      const count = Math.max(state.count - 1, 0);
      const isLoading = count > 0;

      return {
        count,
        isLoading,
      };
    }
    default:
      return state;
  }
}
