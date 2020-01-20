import { createReducer, createActions } from 'reduxsauce';

const defaultSettings = {
  exercises: 15, // number of questions in one run
  maxResponseLen: 3, // 0 .. 999
  timeLimit: 4000, // time limit for correct answer (in ms)
};

const initialState = {
  module: null,
  run: [],
  settings: null,
};

const { Types, Creators } = createActions({
  mathIntSetModule: ['module', 'settingsUpdates'], // handled here and in saga
  mathIntAddExercise: ['exercise'], // handled here
  mathIntResponse: ['response'], // handled in saga
  mathIntAddResponse: ['response'], // handled here
});

export const types = Types;
export const actions = Creators;

// handlers
const reset = (state = initialState, { module, settingsUpdates }) => ({
  ...state,
  module,
  settings: {
    ...(defaultSettings),
    ...(settingsUpdates),
  },
  run: [],
});

const addExercise = (state = initialState, { exercise }) => ({
  ...state,
  run: [...(state.run), exercise],
});

const addResponse = (state = initialState, { response }) => {
  const last = state.run[state.run.length - 1];
  const copy = [...(state.run)];
  copy[copy.length - 1] = { ...last, ...response };
  return {
    ...state,
    run: copy,
  };
};

// reducer
export const reducer = createReducer(
  initialState,
  {
    [Types.MATH_INT_SET_MODULE]: reset,
    [Types.MATH_INT_ADD_EXERCISE]: addExercise,
    [Types.MATH_INT_ADD_RESPONSE]: addResponse,
  },
);
