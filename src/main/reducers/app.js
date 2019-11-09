import { createReducer, createActions } from 'reduxsauce';

const initialState = {
  viewport: {
    width: 0,
    height: 0,
  },
  storage: null,
};

const { Types, Creators } = createActions({
  //
  getViewport: null, // handled in saga
  setViewport: ['width', 'height'], // handled here
  //
  loadStorage: null, // handled in saga
  setStorage: ['data'], // handled here
  updateStorage: ['category', 'data'], // handled here and in saga
});

export const types = Types;
export const actions = Creators;

// handlers

const setViewport = (state = initialState, { width, height }) => ({ ...state, viewport: { width, height } });
const setStorage = (state = initialState, { data }) => ({ ...state, storage: data });
const updateStorage = (state = initialState, { category, data }) => ({
  ...state,
  storage: { ...state.storage, [category]: data },
});

// reducer
export const reducer = createReducer(
  initialState,
  {
    [Types.SET_VIEWPORT]: setViewport,
    [Types.SET_STORAGE]: setStorage,
    [Types.UPDATE_STORAGE]: updateStorage,
  },
);
