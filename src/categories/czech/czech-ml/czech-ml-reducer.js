import { createReducer, createActions } from 'reduxsauce';

const defaultSettings = {
  exercises: 20, // number of questions in one run
  timeLimit: 2500, // time limit for correct answer (in ms)
};

const initialState = {
  module: null,
  run: [],
  settings: null,
};

const { Types, Creators } = createActions({
  czechMLSetModule: ['module', 'settingsUpdates'], // handled here and in saga
  czechMLAddExercise: ['exercise'], // handled here
  czechMLResponse: ['response'], // handled in saga
  czechMLAddResponse: ['response'], // handled here
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
    [Types.CZECH_ML_SET_MODULE]: reset,
    [Types.CZECH_ML_ADD_EXERCISE]: addExercise,
    [Types.CZECH_ML_ADD_RESPONSE]: addResponse,
  },
);
