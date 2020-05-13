import { createReducer, createActions } from 'reduxsauce';

const initialState = {
  viewport: {
    width: 0,
    height: 0,
  },
  storage: null,
  storageBytes: 0,
  newVersionAvailable: false,
  online: false,
};

const { Types, Creators } = createActions({
  //
  getViewport: null, // handled in saga
  setViewport: ['width', 'height'], // handled here
  //
  loadStorage: null, // handled in saga
  setStorage: ['data'], // handled here
  updateStorage: ['category', 'data'], // handled here and in saga
  setStorageBytes: ['bytes'], // handled here
  //
  checkVersion: null, // handled in saga
  setNewVersionAvailable: ['version'], // handled here
  reloadApp: null, // handled in saga
  startInstallation: null, // handled in saga
  finishInstallation: null, // handled in saga
  //
  setOnline: ['online'], // handled here
  checkOnline: null, // handled in saga
  //
  resetScroll: null, // handled in saga
  //
  openExternalLink: ['target'], // handled in saga
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
const setStorageBytes = (state = initialState, { bytes }) => ({ ...state, storageBytes: bytes });
const setNewVersionAvailable = (state = initialState, { version }) => ({ ...state, newVersionAvailable: version });
const setOnline = (state = initialState, { online }) => ({ ...state, online });

// reducer
export const reducer = createReducer(
  initialState,
  {
    [Types.SET_VIEWPORT]: setViewport,
    [Types.SET_STORAGE]: setStorage,
    [Types.UPDATE_STORAGE]: updateStorage,
    [Types.SET_STORAGE_BYTES]: setStorageBytes,
    [Types.SET_NEW_VERSION_AVAILABLE]: setNewVersionAvailable,
    [Types.SET_ONLINE]: setOnline,
  },
);
