import { combineReducers } from 'redux';
import { loader } from './loader';
import { pokemon } from './pokemon';
import { pokemonCompare } from './pokemon-compare';

export const rootReducer = combineReducers({
  loader,
  pokemon,
  pokemonCompare,
});
