import React from 'react';
import { Module } from '../../../core/module';
import { randomInt, onModuleActivate } from '../../utils';

const View = ({ options }) => (<div className="problem">{options.a1} &#215; {options.a2}</div>);

// method of selecting questions: 0: pick from 'wrong' array, 1: pick from 'slow' array, 2: generate new
// method with higher number is always fallback for the current one
const methods = [0, 0, 1, 2];

// frequency of given number in the array drives the probability of that number being selected
const numbers = [0, 1, 2, 3, 4, 4, 4, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10];

export const mul5 = new Module({
  routeName: 'mul5',
  title: 'malá násobilka',
  subtitle: 'čísla do pěti',
  onActivate: (ctx, options) => {
    onModuleActivate(ctx, options);
    return { maxResponseLen: 2 };
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
        a1 = 2 + randomInt(4); // 2 .. 5
        a2 = numbers[randomInt(numbers.length)];
      }
      // unique test: make sure there is enough unique problems!
      found = true;
      for (let i = 0; i < ctx.prev.length; i += 1) {
        const prev = ctx.prev[i];
        if (((prev.a1 === a1) && (prev.a2 === a2)) || ((prev.a1 === a2) && (prev.a2 === a1))) { found = false; }
      }
      if (method === 0) { ctx.wrong.splice(idx, 1); }
      if (method === 1) { ctx.slow.splice(idx, 1); }
    }
    if ((method === 2) && randomInt(2)) {
      // swap a1 with a2
      const t = a1;
      a1 = a2;
      a2 = t;
    }
    ctx.prev.push({ a1, a2 });
    return { a1, a2 };
  },
  View,
  correctResp: ({ a1, a2 }) => ((a1 * a2).toString()),
});
