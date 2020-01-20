export const randomInt = (max) => (Math.floor(max * Math.random()));

export const initCategoryStorage = (storage, module) => {
  const store = storage || {};
  const modules = store.modules || {};
  if (modules[module]) { return storage; }
  return {
    ...storage,
    modules: {
      ...modules,
      [module]: {
        exercises: 0,
        finished: {
          count: 0,
          updated: 0,
        },
        runs: [],
        best: {
          correct: 0,
          time: -1, // never finished with at least 1 good answer
          updated: 0,
        },
        stars: {
          count: 0,
          updated: 0,
        },
        wrong: [],
        slow: [],
      },
    },
  };
};

export const onModuleActivate = (ctx, options) => {
  const store = options.store || {};
  const { wrong, slow } = store;
  ctx.prev = [];
  ctx.wrong = [...(wrong || [])];
  ctx.slow = [...(slow || [])];
  return {};
};
