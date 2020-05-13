import { combineReducers } from 'redux';
import { loader } from './loader';
import { pokemon } from './pokemon';
import { pokemonCompare } from './pokemon-compare';
import { State } from '../store';

export const rootReducer = combineReducers<State>({
  loader,
  pokemon,
  pokemonCompare,
});
