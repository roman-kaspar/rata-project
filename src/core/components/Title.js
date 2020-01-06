import React from 'react';
import { connect } from 'react-redux';
import { actions as routerActions } from 'redux-router5';
import { actions as appActions } from '../reducers/app';

import './Title.css';

const TitleView = ({
  title,
  subtitle,
  icon,
  route,
  navigate,
  newVersion,
  online,
  startInstallation,
  reloadApp,
}) => (
  <>
    {icon && (
      <button type="button" onClick={() => {
        if (route) {
          navigate(route.name, route.params);
        } else if (newVersion && online) {
          startInstallation();
        } else {
          reloadApp();
        }
      }} className={(!route && newVersion && online) ? 'new-version' : ''}>
        {icon()}
      </button>
    )}
    <div className="text">
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle || ''}</div>
    </div>
  </>
);

const mapStateToProps = (state) => ({
  newVersion: state.app.newVersionAvailable,
  online: state.app.online,
});

const mapDispatchToProps = {
  navigate: routerActions.navigateTo,
  startInstallation: appActions.startInstallation,
  reloadApp: appActions.reloadApp,
};

export const Title = connect(mapStateToProps, mapDispatchToProps)(TitleView);
