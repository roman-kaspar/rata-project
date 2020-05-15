import React from 'react';
import { Module } from '../../../core/module';
import { onModuleActivate } from '../../utils';
import { createNext } from './utils';

const values = [
  { val1: 'i', val2: 'y' },
  { val1: 'í', val2: 'ý' },
];

// http://www.zlobidlo.cz/rodice/cviceni-vyjmenovana-slova-z
export const dictionary = [
  { text: 'letiště v Ruz_ni', valIdx: 0, correct: 'y' },
  { text: 'brz_čko', valIdx: 0, correct: 'i' },
  { text: 'mlsný jaz_ček', valIdx: 1, correct: 'ý' },
  { text: 'z_mní oblečení', valIdx: 0, correct: 'i' },
  { text: 'dvojjaz_čná výchova', valIdx: 0, correct: 'y' },
  { text: 'vyz_vat na souboj', valIdx: 1, correct: 'ý' },
  { text: 'oz_val se hluk', valIdx: 1, correct: 'ý' },
  { text: 'jaz_k jako břitva', valIdx: 0, correct: 'y' },
  { text: 'naz_vá se Litomyšl', valIdx: 1, correct: 'ý' },
  { text: 'udělám to z_tra', valIdx: 1, correct: 'í' },
  { text: 'sejdeme se poz_tří', valIdx: 1, correct: 'í' },
  { text: 'nez_vej!', valIdx: 1, correct: 'í' },
  { text: 'cizí jaz_k', valIdx: 0, correct: 'y' },
  { text: 'ruz_ňské letiště', valIdx: 0, correct: 'y' },
  { text: 'podz_mní vítr', valIdx: 0, correct: 'i' },
  { text: 'český jaz_k', valIdx: 0, correct: 'y' },
  { text: 'jaz_kovědec', valIdx: 0, correct: 'y' },
  { text: 'rozepnutý z_p', valIdx: 0, correct: 'i' },
  { text: 'rozbitá z_dka', valIdx: 1, correct: 'í' },
  { text: 'basketbalista Z_dek', valIdx: 1, correct: 'í' },
  { text: 'z_mní radovánky', valIdx: 0, correct: 'i' },
  { text: 'hlasitá muz_ka', valIdx: 0, correct: 'i' },
  { text: 'nastala z_ma', valIdx: 0, correct: 'i' },
  { text: 'hodně se naz_val', valIdx: 1, correct: 'í' },
  { text: 'studený podz_m', valIdx: 0, correct: 'i' },
  { text: 'z_skala první cenu', valIdx: 1, correct: 'í' },
  { text: 'jaký máš z_sk?', valIdx: 0, correct: 'i' },
  { text: 'sýkorky přez_mují', valIdx: 0, correct: 'i' },
  { text: 'z_nkový plech', valIdx: 0, correct: 'i' },
  { text: 'teplé z_mníky', valIdx: 0, correct: 'i' },
  { text: 'kočičí jaz_čky', valIdx: 1, correct: 'ý' },
  { text: 'jaz_ková příprava', valIdx: 0, correct: 'y' },
  { text: 'mrštný  jaz_k', valIdx: 0, correct: 'y' },
  { text: 'brz_čko bude sněžit', valIdx: 0, correct: 'i' },
  { text: 'z_vala ve škole', valIdx: 1, correct: 'í' },
  { text: 'nákupní voz_k', valIdx: 1, correct: 'í' },
  { text: 'vyz_vavý pohled', valIdx: 1, correct: 'ý' },
  { text: 'z_tra přijdu', valIdx: 1, correct: 'í' },
  { text: 'mraz_vé noci', valIdx: 0, correct: 'i' },
  { text: 'nez_štný člověk', valIdx: 0, correct: 'i' },
  { text: 'z_mní měsíc', valIdx: 0, correct: 'i' },
  { text: 'z_tra ráno', valIdx: 1, correct: 'í' },
  { text: 'jogurt se zkaz_l', valIdx: 0, correct: 'i' },
  { text: 'z_momřivý pán', valIdx: 0, correct: 'i' },
  { text: 'z_mní stadion', valIdx: 0, correct: 'i' },
  { text: 'je tu plno ciz_nců', valIdx: 0, correct: 'i' },
  { text: 'z_skal medaili', valIdx: 1, correct: 'í' },
  { text: 'Hanzelka a Z_kmund', valIdx: 0, correct: 'i' },
  { text: 'Krokova dcera Kaz_', valIdx: 0, correct: 'i' },
  { text: 'slovanské jaz_ky', valIdx: 0, correct: 'y' },
  { text: 'v Ruz_ni', valIdx: 0, correct: 'y' },
  { text: 'Jan Sladký Koz_na', valIdx: 0, correct: 'i' },
  { text: 'z_moviště', valIdx: 0, correct: 'i' },
  { text: 'čápi přez_mují', valIdx: 0, correct: 'i' },
  { text: 'z_skávám vědomosti', valIdx: 1, correct: 'í' },
  { text: 'špičatý jaz_ček', valIdx: 1, correct: 'ý' },
  { text: 'z_vající divák', valIdx: 1, correct: 'í' },
  { text: 'naz_vat jménem', valIdx: 1, correct: 'ý' },
  { text: 'první z_mní den', valIdx: 0, correct: 'i' },
  { text: 'jedu do ciz_ny', valIdx: 0, correct: 'i' },
  { text: 'vyz_vám ke klidu', valIdx: 1, correct: 'ý' },
  { text: 'nízká z_dka', valIdx: 1, correct: 'í' },
  { text: 'Honz_kova cesta', valIdx: 1, correct: 'í' },
  { text: 'nez_štná pomoc', valIdx: 0, correct: 'i' },
  { text: 'poštovní raz_tko', valIdx: 1, correct: 'í' },
  { text: 'podz_mní den', valIdx: 0, correct: 'i' },
  { text: 'z_třek bude studený', valIdx: 1, correct: 'í' },
  { text: 'nepokaz_m ti to', valIdx: 1, correct: 'í' },
  { text: 'malý Lojz_k', valIdx: 1, correct: 'í' },
  { text: 'jaz_kový kurz', valIdx: 0, correct: 'y' },
  { text: 'brz_čko se vrátit', valIdx: 0, correct: 'i' },
];

const View = ({ options }) => (<div className="problem">{dictionary[options.i].text}</div>);

// method of selecting questions: 0: pick from 'wrong' array, 1: pick from 'slow' array, 2: generate new
// method with higher number is always fallback for the current one
const methods = [0, 0, 1, 2];

export const wIYz = new Module({
  routeName: 'w-iy-z',
  title: 'i/y po Z',
  subtitle: 'vyjmenovaná slova',
  onActivate: onModuleActivate,
  next: createNext(dictionary, methods),
  View,
  correctResp: ({ i }) => (dictionary[i].correct),
  choices: ({ i }) => (values[dictionary[i].valIdx]),
});
