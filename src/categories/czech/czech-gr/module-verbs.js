import React from 'react';
import { Module } from '../../../core/module';
import { onModuleActivate } from '../../utils';
import { createNext } from './utils';
import { Controls } from './module-verbs-controls';
import { idx2resp } from './module-verbs-idx2resp';

// https://www.onlinecviceni.cz/
// resp: [ personIdx, numberIdx, tenseIdx ], see module-verbs-idx2resp
export const dictionary = [
  { text: 'ohýbáš', resp: [1, 0, 1] },
  { text: 'kupuje', resp: [2, 0, 1] },
  { text: 'počkali jsme', resp: [0, 1, 0] },
  { text: 'sledovali jsme', resp: [0, 1, 0] },
  { text: 'běhali jsme', resp: [0, 1, 0] },
  { text: 'budou radit', resp: [2, 1, 2] },
  { text: 'točili jste', resp: [1, 1, 0] },
  { text: 'budete pokládat', resp: [1, 1, 2] },
  { text: 'myslíte', resp: [1, 1, 1] },
  { text: 'vařím', resp: [0, 0, 1] },
  { text: 'skáčeme', resp: [0, 1, 1] },
  { text: 'budeme se zouvat', resp: [0, 1, 2] },
  { text: 'budu zavírat', resp: [0, 0, 2] },
  { text: 'vylívali jste', resp: [1, 1, 0] },
  { text: 'budou trhat', resp: [2, 1, 2] },
  { text: 'budeš poznávat', resp: [1, 0, 2] },
  { text: 'šuškáš', resp: [1, 0, 1] },
  { text: 'vstupuje', resp: [2, 0, 1] },
  { text: 'napsal', resp: [2, 0, 0] },
  { text: 'učili jsme se', resp: [0, 1, 0] },
  { text: 'ždímala jsem', resp: [0, 0, 0] },
  { text: 'cvičíme', resp: [0, 1, 1] },
  { text: 'bude vyhánět', resp: [2, 0, 2] },
  { text: 'budeš zkoušet', resp: [1, 0, 2] },
  { text: 'zpívali jsme', resp: [0, 1, 0] },
  { text: 'snědli jste', resp: [1, 1, 0] },
  { text: 'mluvím', resp: [0, 0, 1] },
  { text: 'budeme lámat', resp: [0, 1, 2] },
  { text: 'posíláte', resp: [1, 1, 1] },
  { text: 'prohlížejí', resp: [2, 1, 1] },
  { text: 'podložili jsme', resp: [0, 1, 0] },
  { text: 'bude gumovat', resp: [2, 0, 2] },
  { text: 'bubnoval jsem', resp: [0, 0, 0] },
  { text: 'budou obalovat', resp: [2, 1, 2] },
  { text: 'budu večeřet', resp: [0, 0, 2] },
  { text: 'sedíš', resp: [1, 0, 1] },
  { text: 'honíš', resp: [1, 0, 1] },
  { text: 'foukají', resp: [2, 1, 1] },
  { text: 'ukazoval', resp: [2, 0, 0] },
  { text: 'ničíte', resp: [1, 1, 1] },
  { text: 'budou rozdělovat', resp: [2, 1, 2] },
  { text: 'jíme', resp: [0, 1, 1] },
  { text: 'polykám', resp: [0, 0, 1] },
  { text: 'budeš plavat', resp: [1, 0, 2] },
  { text: 'budete platit', resp: [1, 1, 2] },
  { text: 'otevíráš', resp: [1, 0, 1] },
  { text: 'strouháte', resp: [1, 1, 1] },
  { text: 'umývali jsme', resp: [0, 1, 0] },
  { text: 'sušila jsem', resp: [0, 0, 0] },
  { text: 'kýchal', resp: [2, 0, 0] },
  { text: 'budete řídit', resp: [1, 1, 2] },
  { text: 'budete podávat', resp: [1, 1, 2] },
  { text: 'ťukáme', resp: [0, 1, 1] },
  { text: 'vrtali', resp: [2, 1, 0] },
  { text: 'budu balit', resp: [0, 0, 2] },
  { text: 'sekali', resp: [2, 1, 0] },
  { text: 'líbala jsem', resp: [0, 0, 0] },
  { text: 'malovali jsme', resp: [0, 1, 0] },
  { text: 'prodáváš', resp: [1, 0, 1] },
  { text: 'kuká', resp: [2, 0, 1] },
  { text: 'chodili jsme', resp: [0, 1, 0] },
  { text: 'budou plakat', resp: [2, 1, 2] },
  { text: 'mrkáme', resp: [0, 1, 1] },
  { text: 'budu nosit', resp: [0, 0, 2] },
  { text: 'telefonoval', resp: [2, 0, 0] },
  { text: 'budeš opírat', resp: [1, 0, 2] },
  { text: 'stříkají', resp: [2, 1, 1] },
  { text: 'vyhazuješ', resp: [1, 0, 1] },
  { text: 'hrabali jste', resp: [1, 1, 0] },
  { text: 'létá', resp: [2, 0, 1] },
  { text: 'budu bojovat', resp: [0, 0, 2] },
  { text: 'sčítáme', resp: [0, 1, 1] },
  { text: 'zvonili jste', resp: [1, 1, 0] },
  { text: 'budeš se válet', resp: [1, 0, 2] },
  { text: 'melou', resp: [2, 1, 1] },
  { text: 'chytali', resp: [2, 1, 0] },
  { text: 'solila jsem', resp: [0, 0, 0] },
  { text: 'budou orat', resp: [2, 1, 2] },
  { text: 'čte', resp: [2, 0, 1] },
  { text: 'budeš klečet', resp: [1, 0, 2] },
  { text: 'mažeme', resp: [0, 1, 1] },
  { text: 'ukrojili', resp: [2, 1, 0] },
  { text: 'bude loupat', resp: [2, 0, 2] },
  { text: 'procházíš', resp: [1, 0, 1] },
  { text: 'myje', resp: [2, 0, 1] },
  { text: 'plnili jste', resp: [1, 1, 0] },
  { text: 'budou filmovat', resp: [2, 1, 2] },
  { text: 'šeptali jsme', resp: [0, 1, 0] },
  { text: 'budu spát', resp: [0, 0, 2] },
  { text: 'poslouchám', resp: [0, 0, 1] },
  { text: 'odložili jste', resp: [1, 1, 0] },
  { text: 'roztřídili', resp: [2, 1, 0] },
  { text: 'budeš stříhat', resp: [1, 0, 2] },
  { text: 'budu lézt', resp: [0, 0, 2] },
  { text: 'kopali jsme', resp: [0, 1, 0] },
  { text: 'opravujete', resp: [1, 1, 1] },
  { text: 'brousím', resp: [0, 0, 1] },
  { text: 'bude padat', resp: [2, 0, 2] },
  { text: 'měříme', resp: [0, 1, 1] },
  { text: 'veslují', resp: [2, 1, 1] },
];

const View = ({ options }) => (<div className="problem">{dictionary[options.i].text}</div>);

// method of selecting questions: 0: pick from 'wrong' array, 1: pick from 'slow' array, 2: generate new
// method with higher number is always fallback for the current one
const methods = [0, 0, 1, 2];

export const verbs = new Module({
  routeName: 'verbs',
  title: 'slovesa',
  subtitle: 'časování: osoba, číslo, čas',
  onActivate: onModuleActivate,
  next: createNext(dictionary, methods),
  View,
  correctResp: ({ i }) => (idx2resp(dictionary[i].resp)),
  Controls,
});
