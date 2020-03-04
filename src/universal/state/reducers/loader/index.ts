import { handleActions } from 'redux-actions';
import { LoaderReduxActions } from '../../actions';
import { State } from '../../store';

export const initialState: State['loader'] = {
  count: 0,
  isLoading: false,
};

export const loader = handleActions(
  {
    [LoaderReduxActions.START_LOADING]: s => {
      const count = s.count + 1;
      const isLoading = count > 0;

      return {
        count,
        isLoading,
      };
    },
    [LoaderReduxActions.STOP_LOADING]: s => {
      const count = Math.max(s.count + 1, 0);
      const isLoading = count > 0;

      return {
        count,
        isLoading,
      };
    },
  },
  initialState
);
