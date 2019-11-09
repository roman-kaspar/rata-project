import React from 'react';
import { Icons } from '../../../shared/Icons';
import './NumPad.css';

export const NumPad = ({
  val,
  len,
  update,
  submit,
}) => {
  const delArr = val.split('');
  delArr.pop();
  const delVal = delArr.join('');
  const myUpdate = (str) => {
    if (str.length > len) { return; }
    const arr = str.split('');
    if ((str.length === 2) && (arr[0] === '0')) {
      update(arr[1]);
    } else {
      update(str);
    }
  };
  return (
    <div className="num-pad">
      <div className="num-pad-line">
        <button className="num-pad-btn num-pad-num" type="button" onClick={() => { myUpdate(`${val}1`); }}>1</button>
        <button className="num-pad-btn num-pad-num" type="button" onClick={() => { myUpdate(`${val}2`); }}>2</button>
        <button className="num-pad-btn num-pad-num" type="button" onClick={() => { myUpdate(`${val}3`); }}>3</button>
      </div>
      <div className="num-pad-line">
        <button className="num-pad-btn num-pad-num" type="button" onClick={() => { myUpdate(`${val}4`); }}>4</button>
        <button className="num-pad-btn num-pad-num" type="button" onClick={() => { myUpdate(`${val}5`); }}>5</button>
        <button className="num-pad-btn num-pad-num" type="button" onClick={() => { myUpdate(`${val}6`); }}>6</button>
      </div>
      <div className="num-pad-line">
        <button className="num-pad-btn num-pad-num" type="button" onClick={() => { myUpdate(`${val}7`); }}>7</button>
        <button className="num-pad-btn num-pad-num" type="button" onClick={() => { myUpdate(`${val}8`); }}>8</button>
        <button className="num-pad-btn num-pad-num" type="button" onClick={() => { myUpdate(`${val}9`); }}>9</button>
      </div>
      <div className="num-pad-line">
        <button className="num-pad-btn num-pad-del" type="button" onClick={() => { myUpdate(delVal); }}>
          {Icons.Backspace({ color: '#c89f72' })}
        </button>
        <button className="num-pad-btn num-pad-num" type="button" onClick={() => { myUpdate(`${val}0`); }}>0</button>
        <button className="num-pad-btn num-pad-submit" type="button" onClick={() => { submit(val); }}>
          {Icons.Submit({ color: '#c89f72' })}
        </button>
      </div>
    </div>
  );
};
