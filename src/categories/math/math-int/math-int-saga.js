import {
  put,
  take,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { actions as routerActions } from 'redux-router5';

import { routeName } from './math-int-route';
import { actions, types } from './math-int-reducer';
import { names, params as routeParams } from '../../../main/router/routes';
import { actions as appActions } from '../../../main/reducers/app';
import { update } from './math-int-storage';

const params = (state) => ({
  module: state.categories[routeName].module,
  exercises: state.categories[routeName].runSettings.exercises,
  storage: state.app.storage[routeName],
});

const runResults = (state) => ({
  run: state.categories[routeName].run,
  settings: state.categories[routeName].runSettings,
});

function* exerciseLoop() {
  const { module, exercises, storage } = yield select(params);
  const moduleName = module.routeName();
  for (let i = 0; i < exercises; i += 1) {
    const next = module.next();
    const startMs = Date.now();
    yield put(actions.mathIntAddExercise({ ...next, startMs }));
    const res = yield take(types.MATH_INT_RESPONSE);
    const endMs = Date.now();
    yield put(actions.mathIntAddResponse({
      response: res.response,
      endMs,
    }));
  }
  const { run, settings } = yield select(runResults);
  const updated = update(storage, moduleName, run, settings);
  yield put(appActions.updateStorage(routeName, updated));
  yield put(routerActions.navigateTo(
    `${names.RESULTS}.${routeName}.${moduleName}`,
    { back: routeParams.BACK.CAT, run: -1 },
  ));
}

export function* saga() {
  yield takeLatest(types.MATH_INT_SET_MODULE, exerciseLoop);
}
