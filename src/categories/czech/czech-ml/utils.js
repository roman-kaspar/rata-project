import { randomInt } from '../../utils';

export const createNext = (dictionary, values, methods) => ((ctx) => {
  let found = false;
  let index;
  let vals;
  let v1;
  let v2;
  let c;
  let idx;
  let method;
  while (!found) {
    method = methods[randomInt(methods.length)];
    if (method === 0) {
      if (ctx.wrong.length) {
        idx = randomInt(ctx.wrong.length);
        index = ctx.wrong[idx].i;
        v1 = ctx.wrong[idx].v1; // eslint-disable-line prefer-destructuring
        v2 = ctx.wrong[idx].v2; // eslint-disable-line prefer-destructuring
        c = ctx.wrong[idx].r;
      } else {
        method = 1;
      }
    }
    if (method === 1) {
      if (ctx.slow.length) {
        idx = randomInt(ctx.slow.length);
        index = ctx.slow[idx].i;
        v1 = ctx.slow[idx].v1; // eslint-disable-line prefer-destructuring
        v2 = ctx.slow[idx].v2; // eslint-disable-line prefer-destructuring
        c = ctx.slow[idx].r;
      } else {
        method = 2;
      }
    }
    if (method === 2) {
      idx = randomInt(dictionary.length);
      index = idx;
      vals = values[dictionary[idx].valIdx];
      v1 = vals.val1;
      v2 = vals.val2;
      c = dictionary[idx].correct;
    }
    found = true;
    // unique test: make sure there is enough unique problems!
    for (let i = 0; i < ctx.prev.length; i += 1) {
      const prev = ctx.prev[i];
      if (prev.i === index) { found = false; }
    }
    if (method === 0) { ctx.wrong.splice(idx, 1); }
    if (method === 1) { ctx.slow.splice(idx, 1); }
  }
  ctx.prev.push({ i: index });
  return {
    i: index,
    v1,
    v2,
    c,
  };
});
