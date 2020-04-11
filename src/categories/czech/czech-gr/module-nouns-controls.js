import React, { PureComponent } from 'react';
import { LabeledChoicesPad } from '../../shared-components/LabeledChoicesPad';
import { Icons } from '../../../shared/Icons';
import { idx2resp } from './module-nouns-idx2resp';

import './module-nouns-controls.css';

const defaultState = {
  number: -1,
  gender: -1,
  nCase: -1,
};

export class Controls extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultState,
      runLen: 0,
    };
    this.submit = this.submitResult.bind(this);
  }

  update = (key, value) => {
    this.setState({ [key]: value });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.run.length !== state.runLen) {
      return {
        ...defaultState,
        runLen: props.run.length,
      };
    }
    return null;
  }

  submitResult() {
    const { number, gender, nCase } = this.state;
    const { submit } = this.props;
    const result = idx2resp([number, gender, nCase]);
    submit(result);
  }

  render() {
    const { number, gender, nCase } = this.state;
    const { run } = this.props;

    const submitDisabled = (number === -1) || (gender === -1) || (nCase === -1);
    const cx = (submitDisabled ? '#bbb' : '#c89f72');

    if (!run.length) { return null; }

    return (
      <div>
        <LabeledChoicesPad
          label="číslo:"
          values={['jednotné', 'množné']}
          selectIdx={number}
          submit={(val) => { this.update('number', val); }}
        />
        <LabeledChoicesPad
          label="rod:"
          values={['muž. / živ.', 'muž. / než.', 'žen.', 'stř.']}
          selectIdx={gender}
          submit={(val) => { this.update('gender', val); }}
        />
        <LabeledChoicesPad
          label="pád:"
          values={['1', '2', '3', '4', '5', '6', '7']}
          selectIdx={nCase}
          submit={(val) => { this.update('nCase', val); }}
        />
        <div className="nouns-submit-button">
          <button
            className="submit-button"
            type="button"
            disabled={submitDisabled}
            onClick={this.submit}
          >
            {Icons.Submit({ color: cx, fill: cx })}
          </button>
        </div>
      </div>
    );
  }
}
