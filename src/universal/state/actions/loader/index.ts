import { createAction } from 'redux-actions';
import { strEnum } from '../../../../types';
import './index.css';

export const LoaderReduxActions = strEnum(['START_LOADING', 'STOP_LOADING']);

export const startLoadingAction = createAction<void>(
  LoaderReduxActions.START_LOADING
);
export const stopLoadingAction = createAction<void>(
  LoaderReduxActions.STOP_LOADING
);

export type LoaderActions =
  | ReturnType<typeof startLoadingAction>
  | ReturnType<typeof stopLoadingAction>;
