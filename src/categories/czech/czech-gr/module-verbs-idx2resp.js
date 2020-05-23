// convert indices into human-readable strings

const personOpts = [
  '1.', // 0
  '2.', // 1
  '3.', // 2
];

const numberOpts = [
  'jednotné', // 0
  'množné', // 1
];

const tenseOpts = [
  'minulý', // 0
  'přítomný', // 1
  'budoucí', // 2
];

export const idx2resp = (idx) => (`${personOpts[idx[0]]} osoba, číslo ${numberOpts[idx[1]]}, čas ${tenseOpts[idx[2]]}`);
