import { initCategoryStorage } from '../../utils';

// maximum wrong / slow exercises to keep per module
const KEEP_WRONG = 20;
const KEEP_SLOW = 15;
// maximum runs to keep per module
const KEEP_RUNS = 5;
// when to give the third star
const MAX_STARS_RUNS = 3;

export const update = (storage, module, run, settings) => {
  const store = initCategoryStorage(storage, module);
  const mod = store.modules[module];
  mod.exercises = settings.exercises;
  let runCorrect = 0;
  let runSlow = 0;
  const runElems = [];

  run.forEach((ex) => {
    const elWrong = mod.wrong.find((e) => (e.i === ex.i));
    const elSlow = mod.slow.find((e) => (e.i === ex.i));
    const correct = (ex.c === ex.response);
    const time = ex.endMs - ex.startMs;
    const slow = (time > settings.timeLimit);

    if (correct) {
      runCorrect += 1;
      if (elWrong) { // remove
        const idx = mod.wrong.indexOf(elWrong);
        mod.wrong.splice(idx, 1);
      }
      if (slow) { runSlow += 1; }
      if (slow && !elSlow && (mod.slow.length < KEEP_SLOW)) { // insert
        mod.slow.push({
          i: ex.i,
          v1: ex.v1,
          v2: ex.v2,
          r: ex.c,
        });
      }
      if (!slow && elSlow) { // remove
        const idx = mod.slow.indexOf(elSlow);
        mod.slow.splice(idx, 1);
      }
    } else { // not correct
      if (!elWrong && (mod.wrong.length < KEEP_WRONG)) { // insert
        mod.wrong.push({
          i: ex.i,
          v1: ex.v1,
          v2: ex.v2,
          r: ex.c,
        });
      }
      if (elSlow) { // remove
        const idx = mod.slow.indexOf(elSlow);
        mod.slow.splice(idx, 1);
      }
    }

    runElems.push({
      i: ex.i,
      r: ex.c,
      resp: ex.response,
      correct,
      slow,
    });
  });

  const start = run[0].startMs;
  const finish = run[run.length - 1].endMs;
  const time = finish - start;

  mod.finished.count += 1;
  mod.finished.updated = finish;

  if (mod.runs.length >= KEEP_RUNS) {
    const arr = mod.runs;
    mod.runs = [];
    for (let i = arr.length - KEEP_RUNS + 1; i < arr.length; i += 1) {
      mod.runs.push(arr[i]);
    }
  }
  mod.runs.push({
    finished: finish,
    elems: runElems,
    time,
    correct: runCorrect,
    slow: runSlow,
  });

  if (
    (runCorrect > mod.best.correct)
    || ((runCorrect === mod.best.correct) && (time < mod.best.time))
  ) {
    mod.best = {
      correct: runCorrect,
      time,
      updated: finish,
    };
  }

  if ((mod.stars.count < 3) && (runCorrect === run.length)) {
    if (!mod.stars.count) {
      mod.stars = {
        count: 1,
        updated: finish,
      };
    }
    if ((mod.stars.count === 1) && !runSlow) {
      mod.stars = {
        count: 2,
        updated: finish,
      };
    }
    if ((mod.stars.count === 2) && !runSlow && (mod.runs.length >= MAX_STARS_RUNS)) {
      let allGood = true;
      for (let i = mod.runs.length - MAX_STARS_RUNS; i < mod.runs.length; i += 1) {
        const r = mod.runs[i];
        if (r.slow || (r.correct < r.elems.length)) { allGood = false; }
      }
      if (allGood) {
        mod.stars = {
          count: 3,
          updated: finish,
        };
      }
    }
  }

  return store;
};
