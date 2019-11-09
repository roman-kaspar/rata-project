import { Icons } from '../shared/Icons';
import { routes as mainRoutes, names, params } from '../main/router/routes';

export class Category {
  // props:
  // + routeName: string
  // + title: string
  // - subtitle: string || undefined
  // - onActivate: (state) => { ... } || undefined
  // - onDeactivate: (state) => { ... } || undefined
  // + reducer: createReducer()
  // + setModuleAction: createActions().Creators
  // + saga: function* {}
  // + View: React component
  //
  constructor(props) {
    this._props = props;
    this._modules = [];
    this._buttons = null;
  }

  routeName() {
    return this._props.routeName;
  }

  title(module) {
    if (!module) {
      const { title, subtitle } = this._props;
      return { title, subtitle };
    }
    const mod = this._modules.find((m) => (m.routeName() === module));
    const { title, subtitle } = mod.title();
    return {
      title,
      subtitle,
      icon: Icons.NavStop,
      route: { name: this.routeName() },
    };
  }

  routes() {
    const { routeName, title, subtitle } = this._props;
    const { onActivate, onDeactivate, setModuleAction } = this._props;
    const routeList = [{
      name: routeName,
      title,
      subtitle,
      path: `/${routeName}`,
      onActivate: (state) => { if (onActivate) { onActivate(state); } },
      onDeactivate: (state) => { if (onDeactivate) { onDeactivate(state); } },
    }];
    [names.RESULTS, names.HELP].forEach((name) => {
      const obj = mainRoutes.find((item) => (item.name === name));
      if (obj) {
        routeList.push({
          name: `${name}.${routeName}`,
          title: obj.title,
          subtitle: `${title}${subtitle ? ` / ${subtitle}` : ''}`,
          path: `/${routeName}`,
        });
      }
    });
    const catName = this.routeName();
    this._modules.forEach((module) => {
      const moduleRoute = module.route();
      const inner = moduleRoute.name;
      routeList.push({
        ...moduleRoute,
        name: `${routeName}.${inner}`,
        onActivate: (state, dispatch) => {
          const updates = module.onActivate({
            settings: state.categories[catName].settings,
            store: state.app.storage
              && state.app.storage[catName]
              && state.app.storage[catName].modules
              && state.app.storage[catName].modules[inner],
          }) || {};
          dispatch(setModuleAction(module, updates));
        },
        onDeactivate: (state) => { module.onDeactivate(state.categories[catName]); },
      });
      routeList.push({
        ...moduleRoute,
        name: `${names.RESULTS}.${routeName}.${inner}`,
      });
    });
    return routeList;
  }

  reducer() {
    return this._props.reducer;
  }

  saga() {
    return this._props.saga;
  }

  buttons() {
    if (this._buttons) { return this._buttons; }
    this._buttons = [];
    const name = this.routeName();
    this._modules.forEach((module) => {
      const { title, subtitle } = module.title();
      this._buttons.push({
        title,
        subtitle,
        routeName: `${name}.${module.routeName()}`,
        className: 'nav-module',
      });
    });
    [names.RESULTS, names.HELP].forEach((routeName) => {
      const route = mainRoutes.find((item) => (item.name === routeName));
      const { title, subtitle } = this.title();
      this._buttons.push({
        title: route.title,
        subtitle: `${title}${subtitle ? ` / ${subtitle}` : ''}`,
        routeName: `${routeName}.${name}`,
        routeParams: { back: params.BACK.CAT },
        className: 'nav-app',
      });
    });
    return this._buttons;
  }

  view() {
    return this._props.View;
  }

  moduleView(module) {
    const mod = this._modules.find((m) => (m.routeName() === module));
    return mod.view();
  }

  usage(storage) {
    const res = {
      finished: 0,
      modules: [],
      lastTime: 0,
      lastName: null,
      stars: 0,
    };
    this._modules.forEach((module) => {
      const routeName = module.routeName();
      const { title, subtitle } = module.title();
      const usage = module.usage(storage && storage.modules && storage.modules[routeName]);
      res.finished += usage.finished;
      res.stars += usage.stars;
      if (usage.lastTime > res.lastTime) {
        res.lastTime = usage.lastTime;
        res.lastName = routeName;
      }
      res.modules.push({
        title,
        subtitle,
        routeName,
        usage,
      });
    });
    return res;
  }

  addModule(module) {
    this._modules.push(module);
  }
}
