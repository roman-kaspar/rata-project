import {
  call,
  fork,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import uuidv4 from 'uuid/v4'; // random
import LZString from 'lz-string';

import { version } from '../version';
import { actions, types } from '../reducers/app';
import { categories } from '../categories';
import { APP_NAME } from '../constants';

function* getViewportDimensions() {
  yield put(actions.setViewport(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
  ));
}

const STORAGE_KEY = APP_NAME;
const STORAGE_VER = 1;
export const APP_KEY = '_APP';
const defaultStorage = {
  [APP_KEY]: {
    installed: Date.now(),
    uuid: uuidv4(),
    opened: 1,
    openedLast: Date.now(),
  },
};

function* loadStorage() {
  const str = localStorage.getItem(STORAGE_KEY);
  if (!str) {
    yield put(actions.setStorage(defaultStorage));
    yield put(actions.updateStorage(APP_KEY, defaultStorage[APP_KEY]));
    return;
  }
  let obj = null;
  try {
    obj = JSON.parse(str);
  } catch (e) {
    // pass
  }
  if (!obj || (obj.ver !== STORAGE_VER) || !obj.data) {
    yield put(actions.setStorage(defaultStorage));
    yield put(actions.updateStorage(APP_KEY, defaultStorage[APP_KEY]));
    return;
  }
  let data = null;
  try {
    data = JSON.parse(LZString.decompress(obj.data));
  } catch (e) {
    // pass
  }
  if (!data) {
    yield put(actions.setStorage(defaultStorage));
    yield put(actions.updateStorage(APP_KEY, defaultStorage[APP_KEY]));
    return;
  }
  const appData = data[APP_KEY] || {};
  const appUpdates = {
    ...appData,
    opened: (appData.opened || 0) + 1,
    openedLast: Date.now(),
  };
  data[APP_KEY] = appUpdates;
  // delete unused modules; category / array of modules
  const unused = {
    'math-int': ['mul10'],
    'czech-ml': ['w-iy-m', 'w-iy-p', 'w-iy-p-2'],
  };
  Object.keys(unused).forEach((key) => {
    const catData = data[key];
    if (!catData || !catData.modules) { return; }
    const { modules } = catData;
    const cat = unused[key];
    cat.forEach((name) => { delete modules[name]; });
  });
  //
  yield put(actions.setStorage(data));
  yield put(actions.updateStorage(APP_KEY, appUpdates));
}

const getStorage = (state) => (state.app.storage);
function* updateStorage() {
  const storage = yield select(getStorage);
  const obj = {
    ver: STORAGE_VER,
    data: LZString.compress(JSON.stringify(storage)),
  };
  const str = JSON.stringify(obj);
  try {
    localStorage.setItem(STORAGE_KEY, str);
  } catch (e) {
    // pass; can fail in private browser mode
  }
  yield put(actions.setStorageBytes(2 * str.length));
}

const versionApi = async (uuid) => {
  const response = await fetch('/version.json', {
    method: 'POST',
    headers: {
      'X-Client-ID': uuid,
    },
  });
  let body;
  if (response.ok) {
    body = await response.json();
  }
  body = body || {};
  return {
    ok: response.ok,
    status: response.status,
    error: response.statusText,
    version: body.version,
  };
};

const getUuid = (state) => (state.app.storage[APP_KEY].uuid);
const getAvailableVersion = (state) => (state.app.newVersionAvailable);
function* checkVersion() {
  const uuid = yield select(getUuid);
  if (!uuid) { return; }
  try {
    const data = yield call(versionApi, uuid);
    if (data.ok) {
      const ver = yield select(getAvailableVersion);
      let updateNext = false;
      if (!ver) {
        if (version < data.version) { updateNext = true; }
      } else if (ver < data.version) { updateNext = true; }
      if (updateNext) {
        yield put(actions.setNewVersionAvailable(data.version));
      }
    }
  } catch (e) {
    // pass
  }
}

function reloadApp() {
  window.location.reload(true);
}

const getAppStorage = (state) => ({
  storage: state.app.storage[APP_KEY],
  newVersion: state.app.newVersionAvailable,
});
function* startInstallation() {
  const { storage, newVersion } = yield select(getAppStorage);
  storage.installing = newVersion;
  yield put(actions.updateStorage(APP_KEY, storage));
  reloadApp();
}

function* finishInstallation() {
  const { storage } = yield select(getAppStorage);
  storage.installing = undefined;
  yield put(actions.updateStorage(APP_KEY, storage));
  reloadApp();
}

function* checkOnline() {
  yield put(actions.setOnline(navigator.onLine));
}

function resetArticleScroll() {
  const collection = document.getElementsByTagName('article');
  for (const article of collection) { article.scrollTo(0, 0); } // eslint-disable-line no-restricted-syntax
}

export function* saga() {
  yield fork(categories.sagas());
  // app saga
  yield takeLatest(types.GET_VIEWPORT, getViewportDimensions);
  yield takeLatest(types.LOAD_STORAGE, loadStorage);
  yield takeLatest(types.UPDATE_STORAGE, updateStorage);
  yield takeLatest(types.CHECK_VERSION, checkVersion);
  yield takeLatest(types.RELOAD_APP, reloadApp);
  yield takeLatest(types.START_INSTALLATION, startInstallation);
  yield takeLatest(types.FINISH_INSTALLATION, finishInstallation);
  yield takeLatest(types.CHECK_ONLINE, checkOnline);
  yield takeLatest(types.RESET_SCROLL, resetArticleScroll);
  // inital actions
  yield put(actions.getViewport());
  yield put(actions.loadStorage());
  yield put(actions.checkOnline());
}
