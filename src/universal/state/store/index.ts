import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { NamedAPIResource, Pokemon } from '../../../types/pokeapi';
import { PokemonTileItem } from '../../components/pokemon-tile';
import { rootReducer } from '../reducers';
import { AllActions } from '../actions';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
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
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({} as any)
      : compose;
}

export const configureStore = (initialState: State) => {
  const store = createStore<State, AllActions, unknown, unknown>(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  if ('production' !== process.env.NODE_ENV) {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { nextRootReducer } = require('../reducers');
        store.replaceReducer(nextRootReducer);
      });
    }
  }

  return store;
};
