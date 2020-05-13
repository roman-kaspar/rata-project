import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/app';

import './ExternalLink.css';

const ExternalLinkView = ({ target, openLink, children }) => (
  <span className="external-link" onClick={() => { openLink(target); }}>
    {children}
  </span>
);

const mapDispatchToProps = {
  openLink: actions.openExternalLink,
};

export const ExternalLink = connect(undefined, mapDispatchToProps)(ExternalLinkView);
