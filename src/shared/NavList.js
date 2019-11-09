import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'redux-router5';

import './NavList.css';

const NavListView = ({ buttons, navigate }) => (
  <div className="nav-list">
    {buttons.map((btn) => (
      <button
        type="button"
        key={btn.routeName}
        className={btn.className}
        onClick={() => (navigate(btn.routeName, btn.routeParams))}
      >
        <div className="title">{btn.title}</div>
        <div className="subtitle">{btn.subtitle}</div>
      </button>
    ))}
  </div>
);

const mapDispatchToProps = {
  navigate: actions.navigateTo,
};

export const NavList = connect(undefined, mapDispatchToProps)(NavListView);
