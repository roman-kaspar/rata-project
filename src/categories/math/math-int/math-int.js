import { Category } from '../../category';
import { routeName } from './math-int-route';
import { reducer, actions } from './math-int-reducer';
import { saga } from './math-int-saga';
import { View } from './math-int-view';

//
import { mul5 } from './module-mul5';

export const mathInt = new Category({
  routeName,
  title: 'matematika',
  subtitle: 'celočíselné počítání do sta',
  reducer,
  setModuleAction: actions.mathIntSetModule,
  saga,
  View,
});

mathInt.addModule(mul5);
