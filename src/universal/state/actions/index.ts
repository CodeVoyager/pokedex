export * from './loader';
export * from './pokemon';
export * from './pokemon-compare';
import { createAction } from 'redux-actions';
import { strEnum } from '../../../types';
import { LoaderActions } from './loader';
import { PokemonActions } from './pokemon';
import { PokemonCompareActions } from './pokemon-compare';

export const AppReduxActions = strEnum(['SET_ERROR']);

export const setErrorAction = createAction<Error>(AppReduxActions.SET_ERROR);
export type SetErrorAction = ReturnType<typeof setErrorAction>;

export type AllActions =
  | SetErrorAction
  | LoaderActions
  | PokemonActions
  | PokemonCompareActions;
