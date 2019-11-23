import React from 'react';
import { render } from 'react-dom';
// linked package, waiting for PR to be merged
// eslint-disable-next-line import/no-extraneous-dependencies
import Div100vh from 'react-div-100vh';

import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { RouterProvider } from 'react-router5';
import { router5Middleware } from 'redux-router5';

import { router } from './main/router/router';
import { reducer } from './main/reducers/reducer';
import { saga } from './main/sagas/saga';
import { App } from './main/components/App';
import { actions } from './main/reducers/app';
import * as serviceWorker from './serviceWorker';

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger'); // eslint-disable-line global-require
  middlewares.push(logger);
}
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
middlewares.push(router5Middleware(router));
const store = createStore(reducer, applyMiddleware(...middlewares));
sagaMiddleware.run(saga);

router.start(() => {
  render(
    <StoreProvider store={store}>
      <RouterProvider router={router}>
        <Div100vh className="app-container">
          <App />
        </Div100vh>
      </RouterProvider>
    </StoreProvider>,
    document.getElementById('root'),
  );
  //
  window.addEventListener('resize', () => { store.dispatch(actions.getViewport()); });
  //
  serviceWorker.register();
  navigator.serviceWorker.addEventListener('message', (event) => {
    const { action } = event.data;
    if (action === 'newVersionReady') { store.dispatch(actions.finishInstallation()); }
  });
  // connectivity
  window.addEventListener('online', () => { store.dispatch(actions.checkOnline()); });
  window.addEventListener('offline', () => { store.dispatch(actions.checkOnline()); });
  // check for new app version at the beginning and then every 5 minutes
  setTimeout(() => { store.dispatch(actions.checkVersion()); }, 1000 * 2);
  setInterval(() => { store.dispatch(actions.checkVersion()); }, 1000 * 60 * 5);
});
