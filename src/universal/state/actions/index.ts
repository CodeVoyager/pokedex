export * from './loader';
export * from './pokemon';
import { createAction } from 'redux-actions';
import { strEnum } from '../../../types';

export const AppReduxActions = strEnum(['SET_ERROR']);

export const setErrorAction = createAction<Error>(AppReduxActions.SET_ERROR);
