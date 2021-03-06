import { randomInt } from '../../utils';

export const createNext = (dictionary, methods) => ((ctx) => {
  let found = false;
  let idx;
  let index;
  let method;
  while (!found) {
    method = methods[randomInt(methods.length)];
    if (method === 0) {
      if (ctx.wrong.length) {
        idx = randomInt(ctx.wrong.length);
        index = ctx.wrong[idx].i;
      } else {
        method = 1;
      }
    }
    if (method === 1) {
      if (ctx.slow.length) {
        idx = randomInt(ctx.slow.length);
        index = ctx.slow[idx].i;
      } else {
        method = 2;
      }
    }
    if (method === 2) {
      idx = randomInt(dictionary.length);
      index = idx;
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
  return { i: index };
});
