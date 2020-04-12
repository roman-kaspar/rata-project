import React from 'react';
import { Module } from '../../../core/module';
import { onModuleActivate } from '../../utils';
import { createNext } from './utils';
import { Controls } from './module-nouns-controls';
import { idx2resp } from './module-nouns-idx2resp';

// https://www.onlinecviceni.cz/
// resp: [ numberIdx, genderIdx, caseIdx ], see module-nouns-idx2resp
export const dictionary = [
  { text: 'nejlepší *přítel* člověka', resp: [0, 0, 0] },
  { text: 'zavedla je za *tatínkem*', resp: [0, 0, 6] },
  { text: 'měl plné *hrníčky* malin', resp: [1, 1, 3] },
  { text: 'ztratili se *tatínkovi*', resp: [0, 0, 2] },
  { text: 'musela *ježibabě* vařit', resp: [0, 2, 2] },
  { text: 'podle *výšky*', resp: [0, 2, 1] },
  { text: 'pod *stromem*', resp: [0, 1, 6] },
  { text: '*babička* nás vyhlížela', resp: [0, 2, 0] },
  { text: 'velkým *městem* ČR', resp: [0, 3, 6] },
  { text: 'vyhlížela z *okna*', resp: [0, 3, 1] },
  { text: 'šel za *Aničkou*', resp: [0, 2, 6] },
  { text: 'hráli jsme *karty*', resp: [1, 2, 3] },
  { text: 'po *zahradě* běhal pes', resp: [0, 2, 5] },
  { text: 'po zahradě běhal *pes*', resp: [0, 0, 0] },
  { text: '*teta* sekala trávník', resp: [0, 2, 0] },
  { text: 'teta sekala *trávník*', resp: [0, 1, 3] },
  { text: 'když svítil *měsíc*', resp: [0, 1, 0] },
  { text: 'když svítily *hvězdy*', resp: [1, 2, 0] },
  { text: 'starala se o *králíky*', resp: [1, 0, 3] },
  { text: 'staral se o *slepice*', resp: [1, 2, 3] },
  { text: 'zákusek k *večeři*', resp: [0, 2, 2] },
  { text: 'brambory s *máslem*', resp: [0, 3, 6] },
  { text: 'běhali po *louce*', resp: [0, 2, 5] },
  { text: 'hrabali jsme *seno*', resp: [0, 3, 3] },
  { text: 'dívali se na *pohádku*', resp: [0, 2, 3] },
  { text: 'pořad v *televizi*', resp: [0, 2, 5] },
  { text: 'šli k *babičce*', resp: [0, 2, 2] },
  { text: 'u *dědečka* na návštěvě', resp: [0, 0, 1] },
  { text: 'plné hrníčky *malin*', resp: [1, 2, 1] },
  { text: 'procházka k *rybníku*', resp: [0, 1, 2] },
  { text: 'pole za *domem*', resp: [0, 1, 6] },
  { text: 'za domem je *pole*', resp: [0, 3, 0] },
  { text: 'po *obědě* byl klid', resp: [0, 1, 5] },
  { text: 'pomáhali jsme *tetě*', resp: [0, 2, 2] },
  { text: 'uvařit *oběd*', resp: [0, 1, 3] },
  { text: 'krávy na *louce*', resp: [0, 2, 5] },
  { text: 'krávy s *telaty*', resp: [1, 3, 6] },
  { text: 'roj z *úlu*', resp: [0, 1, 1] },
  { text: 'velký roj *včel*', resp: [1, 2, 1] },
  { text: 'po *střeše* domu', resp: [0, 2, 5] },
  { text: 'po střeše *domu*', resp: [0, 1, 1] },
  { text: 'chata u *rybníka*', resp: [0, 1, 1] },
  { text: 'kachna s *káčaty*', resp: [1, 3, 6] },
  { text: 'do teplých *krajin*', resp: [1, 2, 1] },
  { text: 'seděla v *hnízdě*', resp: [0, 3, 5] },
  { text: 'seděla na *vejcích*', resp: [1, 3, 5] },
  { text: 'o *psovi* se říká ...', resp: [0, 0, 5] },
  { text: 'před *chaloupkou*', resp: [0, 2, 6] },
  { text: 'našli *cestičku*', resp: [0, 2, 3] },
  { text: 'jednoho *dne*', resp: [0, 1, 1] },
  { text: 'v *lese*', resp: [0, 1, 5] },
  { text: 'do *džbánku*', resp: [0, 1, 1] },
  { text: 'posadit na *lopatu*', resp: [0, 2, 3] },
  { text: '*Jeníčku*!', resp: [0, 0, 4] },
  { text: '*Mařenko*!', resp: [0, 2, 4] },
  { text: 'vy *zvířata*!', resp: [1, 3, 4] },
  { text: 'krmila ho *sladkostmi*', resp: [1, 2, 6] },
  { text: 'curk na *buchtách*', resp: [1, 2, 5] },
  { text: 'obědvají v *restauraci*', resp: [0, 2, 5] },
  { text: 'po *jídle* uklidí', resp: [0, 3, 5] },
  { text: 'za *jídlo* poděkuje', resp: [0, 3, 3] },
  { text: 'polévka s *knedlíčky*', resp: [1, 1, 6] },
  { text: 'před *jídlem*', resp: [0, 3, 6] },
  { text: 'při *jídle* nemluvíme', resp: [0, 3, 5] },
  { text: 'hlavním *městem* ČR ...', resp: [0, 3, 6] },
  { text: '*Prahou* protéká ...', resp: [0, 2, 6] },
  { text: 'součástí *unie*', resp: [0, 2, 1] },
  { text: 'bydlím v *Praze*', resp: [0, 2, 5] },
  { text: 'ČR tvoří 14 *krajů*', resp: [1, 1, 1] },
  { text: 'zdrojem *dřeva*', resp: [0, 3, 1] },
  { text: 'chov *ryb*', resp: [1, 2, 1] },
  { text: 'vytvořené *člověkem*', resp: [0, 0, 6] },
  { text: 'slouží k *regulaci*', resp: [0, 2, 2] },
  { text: 'v *řekách*', resp: [1, 2, 5] },
  { text: 'pomocí *buzoly*', resp: [0, 2, 1] },
  { text: 'v *krajině*', resp: [0, 2, 5] },
  { text: 'při *pozdravu*', resp: [0, 1, 5] },
  { text: 'během *hovoru*', resp: [0, 1, 1] },
  { text: 'udržuj *čistotu*', resp: [0, 2, 3] },
  { text: 'do *ordinace*', resp: [0, 2, 1] },
  { text: 'o každou *věc*', resp: [0, 2, 3] },
  { text: 'na *vleku*', resp: [0, 1, 5] },
  { text: 's *tatínkem*', resp: [0, 0, 6] },
  { text: 've *škole*', resp: [0, 2, 5] },
  { text: 'jezdí na *svah*', resp: [0, 1, 3] },
  { text: 'na druhém *místě*', resp: [0, 3, 5] },
  { text: 'na konci *sezóny*', resp: [0, 2, 1] },
];

const View = ({ options }) => {
  const arr = dictionary[options.i].text.split('*');
  const [before, noun, after] = arr;
  return (
    <div className="problem">
      {before}
      <span className="highlight">{noun}</span>
      {after}
    </div>
  );
};

// method of selecting questions: 0: pick from 'wrong' array, 1: pick from 'slow' array, 2: generate new
// method with higher number is always fallback for the current one
const methods = [0, 0, 1, 2];

export const nouns = new Module({
  routeName: 'nouns',
  title: 'podstatná jména',
  subtitle: 'skloňování: číslo, rod, pád',
  onActivate: onModuleActivate,
  next: createNext(dictionary, idx2resp, methods),
  View,
  Controls,
});
