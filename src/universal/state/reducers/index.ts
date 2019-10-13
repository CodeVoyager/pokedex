import { combineReducers } from 'redux';
import { loader } from './loader';
import { pokemon } from './pokemon';

export const rootReducer = combineReducers({ loader, pokemon });
