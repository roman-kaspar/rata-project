import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import transitionPath from 'router5-transition-path';

import { NAMES, routes } from './routes';
import { categories } from '../categories';
import { actions } from '../reducers/app';

const onRouteChangeMiddleware = (routeList) => (router, dependencies) => (toState, fromState, done) => {
  const { toActivate, toDeactivate } = transitionPath(toState, fromState);
  //
  const { store } = dependencies;
  const { dispatch } = store;
  const state = store.getState();
  //
  toDeactivate.forEach((name) => {
    const route = routeList.find((r) => (r.name === name));
    if (route && route.onDeactivate) { route.onDeactivate(state, dispatch); }
  });
  //
  toActivate.forEach((name) => {
    const route = routeList.find((r) => (r.name === name));
    if (route && route.onActivate) { route.onActivate(state, dispatch); }
  });
  dispatch(actions.resetScroll());
  done();
};

const allRoutes = routes.concat(categories.routes());

export const router = createRouter(allRoutes, { defaultRoute: NAMES.ROOT });
router.usePlugin(browserPlugin({ useHash: false }));
router.useMiddleware(onRouteChangeMiddleware(allRoutes));
