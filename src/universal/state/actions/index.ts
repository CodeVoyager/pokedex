export * from './loader';
export * from './pokemon';
export * from './pokemon-compare';
import { createAction } from 'redux-actions';
import { strEnum } from '../../../types';

export const AppReduxActions = strEnum(['SET_ERROR']);

export const setErrorAction = createAction<Error>(AppReduxActions.SET_ERROR);
