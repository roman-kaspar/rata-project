import {
  put,
  take,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { actions as routerActions } from 'redux-router5';

import { routeName } from './math-int-route';
import { actions, types } from './math-int-reducer';
import { NAMES, PARAMS as ROUTE_PARAMS } from '../../../core/router/routes';
import { actions as appActions } from '../../../core/reducers/app';
import { update } from './math-int-storage';

const params = (state) => ({
  module: state.categories[routeName].module,
  exercises: state.categories[routeName].settings.exercises,
  storage: state.app.storage[routeName],
});

const runResults = (state) => ({
  run: state.categories[routeName].run,
  settings: state.categories[routeName].settings,
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
  const correctResp = module.correctResp();
  const updated = update(storage, moduleName, correctResp, run, settings);
  yield put(appActions.updateStorage(routeName, updated));
  yield put(routerActions.navigateTo(
    `${NAMES.RESULTS}.${routeName}.${moduleName}`,
    { back: ROUTE_PARAMS.BACK.CAT, run: -1 },
  ));
}

export function* saga() {
  yield takeLatest(types.MATH_INT_SET_MODULE, exerciseLoop);
}
