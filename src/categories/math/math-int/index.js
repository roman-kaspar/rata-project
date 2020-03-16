import { Category } from '../../../core/category';
import { routeName } from './math-int-route';
import { reducer, actions } from './math-int-reducer';
import { saga } from './math-int-saga';
import { View } from './math-int-view';
import { Help } from './math-int-help';

//
import { add20 } from './module-add20';
import { sub20 } from './module-sub20';
import { mul5 } from './module-mul5';
import { div5 } from './module-div5';
import { mul10 } from './module-mul10';
import { div10 } from './module-div10';
import { add100 } from './module-add100';
import { sub100 } from './module-sub100';
import { add1000 } from './module-add1000';
import { sub1000 } from './module-sub1000';

export const mathInt = new Category({
  routeName,
  title: 'matematika',
  subtitle: 'celočíselné počítání',
  reducer,
  setModuleAction: actions.mathIntSetModule,
  saga,
  View,
  Help,
});

mathInt.addModule(add20);
mathInt.addModule(sub20);
mathInt.addModule(mul5);
mathInt.addModule(div5);
mathInt.addModule(mul10);
mathInt.addModule(div10);
mathInt.addModule(add100);
mathInt.addModule(sub100);
mathInt.addModule(add1000);
mathInt.addModule(sub1000);
