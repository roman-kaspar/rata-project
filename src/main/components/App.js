import React from 'react';
import { connect } from 'react-redux';
import {
  isMobile,
  MobileOnly,
  isMobilePortrait,
  MobilePortraitOnly,
} from './Mobile';
import { Main } from './Main';
import { Title } from '../../shared/Title';
import { Icons } from '../../shared/Icons';
import { version } from '../../version';
import { appName } from '../../config';
import { APP_KEY } from '../sagas/saga';
import { Installing } from './Installing';
import { actions } from '../reducers/app';
import './App.css';

const AppView = ({ viewport, installing, abortInstallation }) => {
  if (installing) {
    return (
      <>
        <header>
          <Title title={appName} subtitle={`verze ${version}`} icon={Icons.AppIcon} />
        </header>
        <article>
          <Installing version={installing} abort={abortInstallation} />
        </article>
      </>
    );
  }
  if (!isMobile(viewport)) {
    return (
      <>
        <header>
          <Title title={appName} subtitle={`verze ${version}`} icon={Icons.AppIcon} />
        </header>
        <article>
          <MobileOnly width={viewport.width} height={viewport.height} />
        </article>
      </>
    );
  }
  if (!isMobilePortrait(viewport)) {
    return (
      <>
        <header>
          <Title title={appName} subtitle={`verze ${version}`} icon={Icons.AppIcon} />
        </header>
        <article>
          <MobilePortraitOnly />
        </article>
      </>
    );
  }
  return <Main />;
};

const mapStateToProps = (state) => ({
  installing: state.app.storage[APP_KEY].installing,
  viewport: state.app.viewport,
});

const mapDispatchToProps = {
  abortInstallation: actions.finishInstallation,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppView);
