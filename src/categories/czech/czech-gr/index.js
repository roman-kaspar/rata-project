import { Category } from '../../../core/category';
import { routeName } from './czech-gr-route';
import { reducer, actions } from './czech-gr-reducer';
import { saga } from './czech-gr-saga';
import { View } from './czech-gr-view';
import { Help } from './czech-gr-help';

//
import { nouns } from './module-nouns';

export const czechGr = new Category({
  routeName,
  title: 'český jazyk',
  subtitle: 'gramatické jevy',
  reducer,
  setModuleAction: actions.czechGrSetModule,
  saga,
  View,
  Help,
});

czechGr.addModule(nouns);
