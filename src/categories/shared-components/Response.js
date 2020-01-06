import React from 'react';
import './Response.css';

const Caret = () => (<div className="caret"></div>);

export const Response = ({ val }) => (
  <div className="response">
    <div>{val}</div>
    <Caret />
  </div>
);
