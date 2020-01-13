import React from 'react';
import { Module } from '../../../core/module';
import { randomInt } from '../../utils';

const View = ({ options }) => (<div className="problem">{options.a1 * options.a2} : {options.a2}</div>);

// method of selecting questions: 0: pick from 'wrong' array, 1: pick from 'slow' array, 2: generate new
// method with higher number is always fallback for the current one
const methods = [0, 0, 1, 2];

// frequency of given number in the array drives the probability of that number being selected
const numbers1 = [1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5];
const numbers2 = [1, 2, 3, 4, 4, 4, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10];

export const div5 = new Module({
  routeName: 'div5',
  title: 'dělení',
  subtitle: 'čísla do pěti',
  onActivate: (ctx, options) => {
    const store = options.store || {};
    const { wrong, slow } = store;
    ctx.prev = [];
    ctx.wrong = [...(wrong || [])];
    ctx.slow = [...(slow || [])];
    return {
      exercises: 15,
      maxResponseLen: 1, // 1 .. 5
      timeLimit: 4000, // ms
    };
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
        a1 = numbers1[randomInt(numbers1.length)];
        a2 = numbers2[randomInt(numbers2.length)];
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
    return {
      a1,
      a2,
      r: a1,
    };
  },
  View,
});
