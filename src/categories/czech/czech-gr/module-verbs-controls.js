import React, { PureComponent } from 'react';
import { LabeledChoicesPad } from '../../shared-components/LabeledChoicesPad';
import { Icons } from '../../../shared/Icons';
import { idx2resp } from './module-verbs-idx2resp';

import './module-verbs-controls.css';

const defaultState = {
  person: -1,
  number: -1,
  tense: -1,
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
    const { person, number, tense } = this.state;
    const { submit } = this.props;
    const result = idx2resp([person, number, tense]);
    submit(result);
  }

  render() {
    const { person, number, tense } = this.state;
    const { run } = this.props;

    const submitDisabled = (person === -1) || (number === -1) || (tense === -1);
    const cx = (submitDisabled ? '#bbb' : '#c89f72');

    if (!run.length) { return null; }

    return (
      <div>
        <LabeledChoicesPad
          label="osoba:"
          values={['1. osoba', '2. osoba', '3. osoba']}
          selectIdx={person}
          submit={(val) => { this.update('person', val); }}
        />
        <LabeledChoicesPad
          label="číslo:"
          values={['jednotné', 'množné']}
          selectIdx={number}
          submit={(val) => { this.update('number', val); }}
        />
        <LabeledChoicesPad
          label="čas:"
          values={['minulý', 'přítomný', 'budoucí']}
          selectIdx={tense}
          submit={(val) => { this.update('tense', val); }}
        />
        <div className="verbs-submit-button">
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
