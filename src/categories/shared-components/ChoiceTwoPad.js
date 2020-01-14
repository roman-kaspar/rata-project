import React from 'react';
import './ChoiceTwoPad.css';

export const ChoiceTwoPad = ({ val1, val2, submit }) => (
  <div className="choice-two-pad">
    <button className="choice-two-pad-btn" type="button" onClick={() => { submit(val1); }}>{val1}</button>
    <button className="choice-two-pad-btn" type="button" onClick={() => { submit(val2); }}>{val2}</button>
  </div>
);
