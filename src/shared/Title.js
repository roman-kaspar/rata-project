import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'redux-router5';

import './Title.css';

export const TitleView = ({
  title,
  subtitle,
  icon,
  route,
  navigate,
}) => (
  <>
    {icon && (<button type="button" onClick={() => { if (route) { navigate(route.name, route.params); } }}>
      {icon()}
    </button>)}
    <div className="text">
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle || ''}</div>
    </div>
  </>
);

const mapDispatchToProps = {
  navigate: actions.navigateTo,
};

export const Title = connect(undefined, mapDispatchToProps)(TitleView);
