import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'redux-router5';

import { NAMES } from '../router/routes';
import { tsToStr } from '../utils';

import './ResultButton.css';

const ResultButtonView = ({ params, className, navigate }) => (
  // TODO: color based on the number of days since used last
  // const days = Math.floor((Date.now() - params.lastTime) / (24 * 60 * 60 * 1000));
  <button
    type="button"
    className={className || 'normal'}
    onClick={() => (navigate(`${NAMES.RESULTS}.${params.routeName}`, params.routeParams))}
  >
    <div className="title">{params.title}</div>
    <div className="subtitle">{params.subtitle}</div>
    {
      (params.lastTime !== undefined) && (params.lastTime !== 0)
      && (<div className="age">naposledy použito: {tsToStr(params.lastTime)}</div>)
    }
  </button>
);

const mapDispatchToProps = {
  navigate: actions.navigateTo,
};

export const ResultButton = connect(undefined, mapDispatchToProps)(ResultButtonView);
