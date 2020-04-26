import { Request } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Store } from 'redux';
import { AllActions, SetErrorAction } from '../../../universal/state/actions';
import { configureStore, State } from '../../../universal/state/store';
import { pageTemplate } from '../../template';

export type BackendActions = Exclude<AllActions, SetErrorAction>;

export function getEmptyState(): State {
  return {
    pokemon: {
      page: 0,
    },
    pokemonCompare: {
      candidates: {},
      current: {},
    },
    loader: {
      count: 0,
      isLoading: false,
    },
  };
}

export function extendEmptyState(partialState: Partial<State>): State {
  return {
    ...getEmptyState(),
    ...partialState,
  };
}

export function wrapPageElement(
  location: string,
  store: Store<State, BackendActions>,
  page: JSX.Element
) {
  return (
    <StaticRouter location={location}>
      <Provider store={store}>{page}</Provider>
    </StaticRouter>
  );
}

export function renderPage(
  req: Request,
  state: State,
  page: JSX.Element,
  actions: AllActions[] = []
) {
  const store = configureStore(state);

  actions.forEach(action => store.dispatch(action as any));

  return pageTemplate(
    renderReact(wrapPageElement(req.path, store, page)),
    store.getState(),
    process.env.NODE_ENV
  );
}

export function renderReact(page: JSX.Element) {
  Helmet.canUseDOM = false;

  const body = ReactDOMServer.renderToString(page);
  const helmet = Helmet.renderStatic();

  return {
    body,
    head: {
      title: helmet.title.toString(),
    },
  };
}
