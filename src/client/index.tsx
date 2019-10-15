import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppWrapped } from '../universal/containers/App';
import { configureStore } from '../universal/state/store';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <AppWrapped />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
);
if ('production' !== process.env.NODE_ENV) {
  if (module.hot) {
    module.hot.accept('../universal/containers/App', () => {
      ReactDOM.render(
        <BrowserRouter>
          <Provider store={store}>
            <AppWrapped />
          </Provider>
        </BrowserRouter>,
        document.getElementById('app')
      );
    });
  }
}
