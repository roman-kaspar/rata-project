import React from 'react';
import { Module } from '../../../core/module';
import { randomInt, onModuleActivate } from '../../utils';

const View = ({ options }) => (<div className="problem">{options.a1} &minus; {options.a2}</div>);

// method of selecting questions: 0: pick from 'wrong' array, 1: pick from 'slow' array, 2: generate new
// method with higher number is always fallback for the current one
const methods = [0, 0, 1, 2];

export const sub100 = new Module({
  routeName: 'sub100',
  title: 'odčítání',
  subtitle: 'čísla do sta',
  onActivate: (ctx, options) => {
    onModuleActivate(ctx, options);
    return { timeLimit: 6000 };
  },
  next: (ctx) => {
    let found = false;
    let a1;
    let a2;
    let method;
    let idx;
    while (!found) {
      method = methods[randomInt(methods.length)];
      if (method === 0) {
        if (ctx.wrong.length) {
          idx = randomInt(ctx.wrong.length);
          a1 = ctx.wrong[idx].a1; // eslint-disable-line prefer-destructuring
          a2 = ctx.wrong[idx].a2; // eslint-disable-line prefer-destructuring
        } else {
          method = 1;
        }
      }
      if (method === 1) {
        if (ctx.slow.length) {
          idx = randomInt(ctx.slow.length);
          a1 = ctx.slow[idx].a1; // eslint-disable-line prefer-destructuring
          a2 = ctx.slow[idx].a2; // eslint-disable-line prefer-destructuring
        } else {
          method = 2;
        }
      }
      if (method === 2) {
        a1 = randomInt(101); // 0 .. 100
        a2 = randomInt(101);
      }
      // make sure the result is non-negative
      if (a1 - a2 < 0) {
        const t = a1;
        a1 = a2;
        a2 = t;
      }
      // unique test: make sure there is enough unique problems!
      found = true;
      for (let i = 0; i < ctx.prev.length; i += 1) {
        const prev = ctx.prev[i];
        if ((prev.a1 === a1) && (prev.a2 === a2)) { found = false; }
      }
      if (method === 0) { ctx.wrong.splice(idx, 1); }
      if (method === 1) { ctx.slow.splice(idx, 1); }
    }
    ctx.prev.push({ a1, a2 });
    return { a1, a2 };
  },
  View,
  correctResp: ({ a1, a2 }) => ((a1 - a2).toString()),
});
