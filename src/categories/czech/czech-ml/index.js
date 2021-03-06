import { Category } from '../../../core/category';
import { routeName } from './czech-ml-route';
import { reducer, actions } from './czech-ml-reducer';
import { saga } from './czech-ml-saga';
import { View } from './czech-ml-view';
import { Help } from './czech-ml-help';

//
import { wIYb } from './module-w-iy-b';
import { wIYl } from './module-w-iy-l';
import { wIYm } from './module-w-iy-m';
import { wIYp } from './module-w-iy-p';
import { wIYs } from './module-w-iy-s';
import { wIYv } from './module-w-iy-v';
import { wIYz } from './module-w-iy-z';

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
czechML.addModule(wIYl);
czechML.addModule(wIYm);
czechML.addModule(wIYp);
czechML.addModule(wIYs);
czechML.addModule(wIYv);
czechML.addModule(wIYz);
