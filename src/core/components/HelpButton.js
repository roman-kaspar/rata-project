import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'redux-router5';

import { NAMES } from '../router/routes';

import './HelpButton.css';

const HelpButtonView = ({ params, className, navigate }) => (
  <button
    type="button"
    className={className || 'normal'}
    onClick={() => (navigate(params.routeName ? `${NAMES.HELP}.${params.routeName}` : NAMES.HELP, params.routeParams))}
  >
    <div className="title">{params.title}</div>
    {params.subtitle && (<div className="subtitle">{params.subtitle}</div>)}
  </button>
);

const mapDispatchToProps = {
  navigate: actions.navigateTo,
};

export const HelpButton = connect(undefined, mapDispatchToProps)(HelpButtonView);
