// convert indices into human-readable strings

const numberOpts = [
  'jednotné', // 0
  'množné', // 1
];

const genderOpts = [
  'mužský živ.', // 0
  'mužský neživ.', // 1
  'ženský', // 2
  'střední', // 3
];

const caseOpts = [
  '1', // 0
  '2', // 1
  '3', // 2
  '4', // 3
  '5', // 4
  '6', // 5
  '7', // 6
];

export const idx2resp = (idx) => (`číslo ${numberOpts[idx[0]]}, rod ${genderOpts[idx[1]]}, ${caseOpts[idx[2]]}. pád`);
