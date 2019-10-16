import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { NamedAPIResource, Pokemon } from '../../../types/pokeapi';
import { PokemonTileItem } from '../../components/pokemon-tile';
import { rootReducer } from '../reducers';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    __INITIAL_STATE__: State;
  }
}

export interface State {
  error?: Error;
  pokemon: {
    page: number;
    current?: Pokemon | null;
    list?: NamedAPIResource[] | null;
  };
  pokemonCompare: {
    candidates: {
      a?: PokemonTileItem;
      b?: PokemonTileItem;
    };
    current: {
      a?: Pokemon;
      b?: Pokemon;
    };
  };
  loader: {
    isLoading: boolean;
    count: number;
  };
}

let composeEnhancers = compose;

if ('production' !== process.env.NODE_ENV) {
  composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
}

export const configureStore = (initialState: State) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  if ('production' !== process.env.NODE_ENV) {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        const { nextRootReducer } = require('../reducers');
        store.replaceReducer(nextRootReducer);
      });
    }
  }

  return store;
};
