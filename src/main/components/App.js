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
import './App.css';

const AppView = ({ viewport }) => {
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
  viewport: state.app.viewport,
});

export const App = connect(mapStateToProps)(AppView);
