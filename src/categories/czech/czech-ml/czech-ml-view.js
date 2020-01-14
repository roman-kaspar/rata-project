import React from 'react';
import { connect } from 'react-redux';

import { routeName } from './czech-ml-route';
import { actions } from './czech-ml-reducer';
import { ChoiceTwoPad } from '../../shared-components/ChoiceTwoPad';
import './czech-ml-view.css';

const CzechML = (props) => {
  const { module, run, settings } = props;
  const { submit } = props;

  if (!module) { return null; }
  if (!run.length) { return null; }

  const current = run[run.length - 1];
  const Problem = module.view();

  return (
    <div className="czech-ml">
      <div className="padding"></div>
      <div>
        <div className="label">
          úloha {run.length} z {settings.exercises}:
        </div>
        <div className="problem-line">
          <Problem options={current} />
        </div>
      </div>
      <ChoiceTwoPad val1={current.v1} val2={current.v2} submit={submit} />
      <div className="padding"></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  module: state.categories[routeName].module,
  run: state.categories[routeName].run,
  settings: state.categories[routeName].settings,
});

const mapDispatchToProps = {
  submit: actions.czechMLResponse,
};

export const View = connect(mapStateToProps, mapDispatchToProps)(CzechML);
