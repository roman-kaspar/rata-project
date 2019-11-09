import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { routeName } from './math-int-route';
import { actions } from './math-int-reducer';
import { NumPad } from '../shared/NumPad';
import { Response } from '../shared/Response';
import './math-int-view.css';

class MathInt extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      runLen: 0,
    };
  }

  update = (input) => {
    this.setState({ input });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.run.length !== state.runLen) {
      return {
        input: '',
        runLen: props.run.length,
      };
    }
    return null;
  }

  render() {
    const { module, run, settings } = this.props;
    const { submit } = this.props;
    const { input } = this.state;

    if (!module) { return null; }
    if (!run.length) { return null; }
    const Problem = module.view();
    return (
      <div className="math-int">
        <div className="padding"></div>
        <div>
          <div className="label">
            příklad {run.length} z {settings.exercises}:
          </div>
          <div className="problem-line">
            <Problem options={run[run.length - 1]} />
            <div>&nbsp;=&nbsp;</div>
            <Response className="response-math-int" val={input} />
          </div>
        </div>
        <NumPad val={input} len={settings.maxResponseLen || 3} update={this.update} submit={submit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  module: state.categories[routeName].module,
  run: state.categories[routeName].run,
  settings: state.categories[routeName].runSettings,
});

const mapDispatchToProps = {
  submit: actions.mathIntResponse,
};

export const View = connect(mapStateToProps, mapDispatchToProps)(MathInt);
