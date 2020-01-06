import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import { Icons } from '../shared/Icons';
import { routes, NAMES, PARAMS as ROUTE_PARAMS } from './router/routes';
import { RESULT_VIEWS } from './constants';

import { mathInt } from '../categories/math/math-int/index';

class Categories {
  constructor() {
    this._categories = [];
    this._routes = null;
    this._reducers = null;
    this._sagas = null;
    this._buttons = null;
  }

  routes() {
    if (this._routes) { return this._routes; }
    this._routes = [];
    this._categories.forEach((cat) => { this._routes = this._routes.concat(cat.routes()); });
    return this._routes;
  }

  reducers() {
    if (this._reducers) { return this._reducers; }
    const reds = {};
    let cnt = 0;
    this._categories.forEach((cat) => {
      const reducer = cat.reducer();
      if (reducer) {
        reds[cat.routeName()] = reducer;
        cnt += 1;
      }
    });
    this._reducers = (cnt ? combineReducers(reds) : null);
    return this._reducers;
  }

  sagas() {
    if (this._sagas) { return this._sagas; }
    const categs = this._categories;
    this._sagas = function* categoriesSagas() {
      for (let i = 0; i < categs.length; i += 1) {
        const saga = categs[i].saga();
        if (saga) { yield fork(saga); }
      }
    };
    return this._sagas;
  }

  title(routeName, module) {
    const cat = this._categories.find((c) => (c.routeName() === routeName));
    if (!module) {
      const { title, subtitle } = cat.title();
      return {
        title,
        subtitle,
        icon: Icons.NavBack,
        route: { name: NAMES.ROOT },
      };
    }
    return cat.title(module);
  }

  buttons(category) {
    if (category === undefined) {
      // top-level list of categories as buttons
      if (this._buttons) { return this._buttons; }
      this._buttons = [];
      this._categories.forEach((cat) => {
        const { title, subtitle } = cat.title();
        const routeName = cat.routeName();
        this._buttons.push({
          title,
          subtitle,
          routeName,
          className: 'nav-category',
        });
      });
      [NAMES.RESULTS, NAMES.HELP].forEach((routeName) => {
        const route = routes.find((item) => (item.name === routeName));
        const { title, subtitle } = route;
        const params = {
          title,
          subtitle,
          routeName,
          className: 'nav-app',
        };
        if (routeName === NAMES.RESULTS) { params.routeParams = { back: ROUTE_PARAMS.BACK.TOP }; }
        this._buttons.push(params);
      });
      return this._buttons;
    }
    // buttons for given category
    const cat = this._categories.find((c) => (c.routeName() === category));
    return cat.buttons();
  }

  view(category) {
    const cat = this._categories.find((c) => (c.routeName() === category));
    return cat.view();
  }

  moduleView(category, module) {
    const cat = this._categories.find((c) => (c.routeName() === category));
    return cat.moduleView(module);
  }

  results(category, module, params, store) {
    if (category) {
      const cat = this._categories.find((c) => (c.routeName() === category));
      if (module) {
        // module view
        const st = store[category];
        const mod = (st && st.modules && st.modules[module]) || {};
        const res = {
          ...mod,
          routeParams: params,
        };
        return {
          View: RESULT_VIEWS.MOD,
          data: res,
        };
      }
      // category view
      const usage = cat.usage(store[category]);
      const res = {
        ...usage,
        routeParams: params,
      };
      return {
        View: RESULT_VIEWS.CAT,
        data: res,
      };
    }
    // top-level
    const res = {
      finished: 0,
      categories: [],
      modules: 0,
      lastTime: 0,
      lastName: null,
      stars: 0,
    };
    this._categories.forEach((cat) => {
      const { title, subtitle } = cat.title();
      const routeName = cat.routeName();
      const usage = cat.usage(store[routeName]);
      res.finished += usage.finished;
      res.modules += usage.modules.length;
      res.stars += usage.stars;
      if (usage.lastTime > res.lastTime) {
        res.lastTime = usage.lastTime;
        res.lastName = routeName;
      }
      res.categories.push({
        title,
        subtitle,
        routeName,
        usage,
      });
    });
    return {
      View: RESULT_VIEWS.TOP,
      data: res,
    };
  }

  add(category) {
    this._categories.push(category);
  }
}

export const categories = new Categories();
categories.add(mathInt);
