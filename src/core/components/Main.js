import React from 'react';
import { connect } from 'react-redux';

import { routes, NAMES, PARAMS } from '../router/routes';
import { Title } from './Title';
import { Icons } from '../../shared/Icons';
import { NavList } from './NavList';
import { categories } from '../categories';
import { Results } from './Results';

const getTitle = (route) => {
  const [top, level1, level2] = route.name.split('.');
  let res = {};
  const item = routes.find((r) => (r.name === top));
  if (level1 === undefined) {
    // top-level route
    if (item) {
      res.title = item.title;
      res.subtitle = item.subtitle;
      if (top !== NAMES.ROOT) {
        res.icon = Icons.NavBack;
        res.route = { name: NAMES.ROOT };
      } else {
        res.icon = Icons.AppIcon;
      }
    } else {
      res = categories.title(top);
    }
  } else if (level2 === undefined) {
    // top-level + level1
    if (item) {
      const { title, subtitle } = categories.title(level1);
      res.title = item.title;
      res.subtitle = `${title} / ${subtitle}`;
      res.icon = Icons.NavBack;
      res.route = { name: (route.params.back === PARAMS.BACK.CAT ? level1 : top) };
    } else {
      res = categories.title(top, level1);
    }
  } else {
    // /results/:category/:module
    const { title, subtitle } = categories.title(level1, level2);
    res.title = item.title;
    res.subtitle = `${title} / ${subtitle}`;
    res.icon = Icons.NavBack;
    if (route.params.run !== undefined) {
      if (route.params.run === -1) {
        res.route = { name: level1 };
      } else {
        res.route = {
          name: route.name,
          params: {
            ...(route.params),
            run: undefined,
          },
        };
      }
    } else if (route.params.wrong) {
      res.route = {
        name: route.name,
        params: {
          ...(route.params),
          wrong: undefined,
        },
      };
    } else if (route.params.slow) {
      res.route = {
        name: route.name,
        params: {
          ...(route.params),
          slow: undefined,
        },
      };
    } else {
      res.route = {
        name: `${top}.${level1}`,
        params: route.params,
      };
    }
  }
  return (<Title title={res.title} subtitle={res.subtitle} icon={res.icon} route={res.route} />);
};

const getView = (route) => {
  const nameArr = route.name.split('.');
  const [top, module] = nameArr;
  let buttons;
  let View;
  switch (top) {
    case NAMES.ROOT:
      buttons = categories.buttons();
      return (<NavList buttons={buttons} />);
    case NAMES.RESULTS:
      return (<Results route={route} categs={categories} />);
    case NAMES.HELP:
      return (<div>TODO</div>);
    default:
      if (module) {
        View = categories.view(top);
        return (<View />);
      }
      buttons = categories.buttons(top);
      return (<NavList buttons={buttons} />);
  }
};

const MainView = ({ route }) => (
  <>
    <header>{getTitle(route)}</header>
    <article>{getView(route)}</article>
  </>
);

const mapStateToProps = (state) => ({
  route: state.router.route,
});
export const Main = connect(mapStateToProps)(MainView);
