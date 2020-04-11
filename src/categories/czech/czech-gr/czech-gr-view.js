import React from 'react';
import { connect } from 'react-redux';

import { routeName } from './czech-gr-route';
import { actions } from './czech-gr-reducer';
import './czech-gr-view.css';

const CzechGr = (props) => {
  const { module, run, settings } = props;
  const { submit } = props;

  if (!module) { return null; }
  if (!run.length) { return null; }

  const current = run[run.length - 1];
  const Problem = module.view();
  const Controls = module.controls();

  return (
    <div className="czech-gr">
      <div className="padding"></div>
      <div>
        <div className="label">
          úloha {run.length} z {settings.exercises}:
        </div>
        <div className="problem-line">
          <Problem options={current} />
        </div>
      </div>
      <div className="padding"></div>
      <Controls submit={submit} run={run} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  module: state.categories[routeName].module,
  run: state.categories[routeName].run,
  settings: state.categories[routeName].settings,
});

const mapDispatchToProps = {
  submit: actions.czechGrResponse,
};

export const View = connect(mapStateToProps, mapDispatchToProps)(CzechGr);
