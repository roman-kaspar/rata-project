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
  window.addEventListener('resize', () => {
    store.dispatch(actions.getViewport());
  });

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA

  serviceWorker.register();
});
