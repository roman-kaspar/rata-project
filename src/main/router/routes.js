/*

  Routes:

    /

    /results
    /results/:category { back: ('category'|'top') }
    /results/:category/:module { back: ('category'|'top'), run: (integer|undefined) }

    /help
    /help/:category { back: ('category'|'top') }

    /:category
    /:category/:module

*/

import { appName } from '../../config';
import { version } from '../../version';

export const names = {
  ROOT: 'root',
  RESULTS: 'results',
  HELP: 'help',
};

export const routes = [
  {
    name: names.ROOT,
    path: '/',
    title: appName,
    subtitle: `verze ${version}`,
  },
  {
    name: names.RESULTS,
    title: 'výsledky',
    subtitle: 'pro všechny kategorie',
    path: `/${names.RESULTS}`,
  },
  {
    name: names.HELP,
    title: 'nápověda',
    subtitle: 'celé aplikace',
    path: `/${names.HELP}`,
  },
];

export const params = {
  BACK: {
    CAT: 'category',
    TOP: 'top',
  },
};
