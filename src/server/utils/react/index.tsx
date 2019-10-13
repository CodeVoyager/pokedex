import { Request } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { configureStore, IState } from '../../../universal/state/store';
import { pageTemplate } from '../../template';

export function getEmptyState(): IState {
  return {
    pokemon: {
      page: 0,
    },
    loader: {
      count: 0,
      isLoading: false,
    },
  };
}

export function extendEmptyState(partialState: Partial<IState>): IState {
  return {
    ...getEmptyState(),
    ...partialState,
  };
}

export function wrapPageElement(
  location: string,
  state: IState,
  page: JSX.Element
) {
  return (
    <StaticRouter location={location}>
      <Provider store={configureStore(state)}>{page}</Provider>
    </StaticRouter>
  );
}

export function renderPage(req: Request, state: IState, page: JSX.Element) {
  return pageTemplate(
    renderReact(wrapPageElement(req.path, state, page)),
    state
  );
}

export function renderReact(page: JSX.Element) {
  return ReactDOMServer.renderToString(page);
}
