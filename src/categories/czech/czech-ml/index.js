import { Category } from '../../../core/category';
import { routeName } from './czech-ml-route';
import { reducer, actions } from './czech-ml-reducer';
import { saga } from './czech-ml-saga';
import { View } from './czech-ml-view';
import { Help } from './czech-ml-help';

//
import { wIYb } from './module-w-iy-b';

export const czechML = new Category({
  routeName,
  title: 'český jazyk',
  subtitle: 'doplňování písmen',
  reducer,
  setModuleAction: actions.czechMLSetModule,
  saga,
  View,
  Help,
});

czechML.addModule(wIYb);
