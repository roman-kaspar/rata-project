import React from 'react';
import './LabeledChoicesPad.css';

export const LabeledChoicesPad = ({
  label,
  values,
  selectIdx,
  submit,
}) => (
  <div className="choices-pad">
    <div className="choices-pad-label">{label}</div>
    <div className="choices-pad-btns">
      {values.map((val, idx) => {
        const cx = (idx === selectIdx) ? 'choices-pad-btn-selected' : 'choices-pad-btn';
        return (
          <button key={idx} className={cx} type="button" onClick={() => { submit(idx); }}>{val}</button>
        );
      })}
    </div>
  </div>
);
