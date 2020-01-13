/*

  Routes:

    /

    /results
    /results/:category { back: ('category'|'top') }
    /results/:category/:module { back: ('category'|'top'), run: (integer|undefined), wrong: boolean, slow: boolean }

    /help
    /help/:category { back: ('category'|'top'), system: boolean, changelog: boolean }

    /:category
    /:category/:module

*/

import { APP_NAME } from '../constants';
import { version } from '../version';

export const NAMES = {
  ROOT: 'root',
  RESULTS: 'results',
  HELP: 'help',
};

export const routes = [
  {
    name: NAMES.ROOT,
    path: '/',
    title: APP_NAME,
    subtitle: `verze ${version}`,
  },
  {
    name: NAMES.RESULTS,
    title: 'výsledky',
    subtitle: 'pro všechny kategorie',
    path: `/${NAMES.RESULTS}`,
  },
  {
    name: NAMES.HELP,
    title: 'nápověda',
    subtitle: 'celé aplikace',
    path: `/${NAMES.HELP}`,
  },
];

export const PARAMS = {
  BACK: {
    CAT: 'category',
    TOP: 'top',
  },
};
