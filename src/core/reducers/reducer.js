import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';

import { reducer as appReducer } from './app';
import { categories } from '../categories';

export const reducer = combineReducers({
  router: router5Reducer,
  app: appReducer,
  categories: categories.reducers(),
});
