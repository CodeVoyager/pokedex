import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from '../universal/containers/App';
import { configureStore } from '../universal/state/store';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
);
if ('production' !== process.env.NODE_ENV) {
  if (module.hot) {
    module.hot.accept('../universal/containers/App', () => {
      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById('app')
      );
    });
  }
}
