import React from 'react';
import { Module } from '../../../core/module';
import { randomInt } from '../../utils';

const values = [
  { val1: 'i', val2: 'y' },
  { val1: 'í', val2: 'ý' },
];

// http://www.zlobidlo.cz/rodice/cviceni-vyjmenovana-slova-b
const dictionary = [
  { text: 'těžké živob_tí', valIdx: 0, correct: 'y' },
  { text: 'b_lá mlha', valIdx: 1, correct: 'í' },
  { text: 'b_tva na poli', valIdx: 0, correct: 'i' },
  { text: 'b_dlím ve městě', valIdx: 0, correct: 'y' },
  { text: 'strakatý b_ček', valIdx: 1, correct: 'ý' },
  { text: 'vaječný b_lek', valIdx: 1, correct: 'í' },
  { text: 'b_lá skříň', valIdx: 1, correct: 'í' },
  { text: 'horská b_střina', valIdx: 0, correct: 'y' },
  { text: 'rozb_tá sekačka', valIdx: 0, correct: 'i' },
  { text: 'lezecká karab_na', valIdx: 0, correct: 'i' },
  { text: 'zlob_m se', valIdx: 1, correct: 'í' },
  { text: 'neslíb_l nic', valIdx: 0, correct: 'i' },
  { text: 'staré b_dliště', valIdx: 0, correct: 'y' },
  { text: 'b_linkový čaj', valIdx: 0, correct: 'y' },
  { text: 'liška B_strouška', valIdx: 0, correct: 'y' },
  { text: 'pěkný slab_kář', valIdx: 0, correct: 'i' },
  { text: 'zaseté ob_lí', valIdx: 0, correct: 'i' },
  { text: 'slunný b_t', valIdx: 0, correct: 'y' },
  { text: 'tvoje bab_čka', valIdx: 0, correct: 'i' },
  { text: 'léčivé b_liny', valIdx: 0, correct: 'y' },
  { text: 'z Přib_slavi', valIdx: 0, correct: 'y' },
  { text: 'zb_tek chleba', valIdx: 0, correct: 'y' },
  { text: 'nezpůsob_l škodu', valIdx: 0, correct: 'i' },
  { text: 'ob_čejný sešit', valIdx: 0, correct: 'y' },
  { text: 'zelená kob_lka', valIdx: 0, correct: 'y' },
  { text: 'ob_vatelé Prahy', valIdx: 0, correct: 'y' },
  { text: 'oblíb_la si mě', valIdx: 0, correct: 'i' },
  { text: 'ab_ch nezapomněl', valIdx: 0, correct: 'y' },
  { text: 'b_jí na poplach', valIdx: 0, correct: 'i' },
  { text: 'pátá hodina odb_la', valIdx: 0, correct: 'i' },
  { text: 'dlouhý b_č', valIdx: 0, correct: 'i' },
  { text: 'přib_l skobu', valIdx: 0, correct: 'i' },
  { text: 'rezavý hřeb_k', valIdx: 1, correct: 'í' },
  { text: 'b_lo slunečno', valIdx: 0, correct: 'y' },
  { text: 'neb_lo oblačno', valIdx: 0, correct: 'y' },
  { text: 'celý příb_tek', valIdx: 0, correct: 'y' },
  { text: 'stará kob_la', valIdx: 0, correct: 'y' },
  { text: 'dobrá nab_dka', valIdx: 1, correct: 'í' },
  { text: 'pan b_tný', valIdx: 0, correct: 'y' },
  { text: 'b_strý chlapec', valIdx: 0, correct: 'y' },
  { text: 'horská b_střina', valIdx: 0, correct: 'y' },
  { text: 'nab_tá zbraň', valIdx: 0, correct: 'i' },
  { text: 'pomáhala b_ch', valIdx: 0, correct: 'y' },
  { text: 'zab_dlený dům', valIdx: 0, correct: 'y' },
  { text: 'prádzný b_t', valIdx: 0, correct: 'y' },
  { text: 'b_ložravec', valIdx: 1, correct: 'ý' },
  { text: 'zb_tek bavlnky', valIdx: 0, correct: 'y' },
  { text: 'nab_l peněz', valIdx: 0, correct: 'y' },
  { text: 'dob_l pevnost', valIdx: 0, correct: 'y' },
  { text: 'přib_l nový žák', valIdx: 0, correct: 'y' },
  { text: 'netrhejte b_lí', valIdx: 1, correct: 'ý' },
  { text: 'b_t doma', valIdx: 1, correct: 'ý' },
  { text: 'pob_vat v Olomouci', valIdx: 1, correct: 'ý' },
  { text: 'malý b_k', valIdx: 1, correct: 'ý' },
  { text: 'roční b_ček', valIdx: 1, correct: 'ý' },
  { text: 'nový náb_tek', valIdx: 0, correct: 'y' },
  { text: 'rozb_tý telefon', valIdx: 0, correct: 'i' },
  { text: 'hlučná sb_ječka', valIdx: 1, correct: 'í' },
  { text: 'nab_dni ostatním', valIdx: 1, correct: 'í' },
  { text: 'b_lá kočka', valIdx: 1, correct: 'í' },
  { text: 'starob_lý hrad', valIdx: 0, correct: 'y' },
  { text: 'b_lit zeď', valIdx: 1, correct: 'í' },
  { text: 'bab_ččina truhla', valIdx: 0, correct: 'i' },
  { text: 'velké krupob_tí', valIdx: 0, correct: 'i' },
  { text: 'b_tevní lodě', valIdx: 0, correct: 'i' },
  { text: 'sušené b_linky', valIdx: 0, correct: 'y' },
  { text: 'neob_čejný život', valIdx: 0, correct: 'y' },
  { text: 'hb_tá dívka', valIdx: 0, correct: 'i' },
  { text: 'zab_vat se něčím', valIdx: 1, correct: 'ý' },
  { text: 'neznámá b_tost', valIdx: 0, correct: 'y' },
  { text: 'B_střice nad Olší', valIdx: 0, correct: 'y' },
  { text: 'dřevěné b_dlo', valIdx: 0, correct: 'i' },
  { text: 'neb_jte ho', valIdx: 0, correct: 'i' },
  { text: 'moderní náb_tek', valIdx: 0, correct: 'y' },
  { text: 'staré ob_čeje', valIdx: 0, correct: 'y' },
  { text: 'kdyb_ch se vrátila', valIdx: 0, correct: 'y' },
  { text: 'pob_vat s přáteli', valIdx: 1, correct: 'ý' },
  { text: 'b_valo pěkněji', valIdx: 1, correct: 'ý' },
  { text: 'auto se mi líb_lo', valIdx: 0, correct: 'i' },
  { text: 'slíb_l přijít', valIdx: 0, correct: 'i' },
  { text: 'b_lý ubrousek', valIdx: 1, correct: 'í' },
  { text: 'ob_čejná tužka', valIdx: 0, correct: 'y' },
  { text: 'neb_j toho psa', valIdx: 0, correct: 'i' },
  { text: 'hodiny odb_ly', valIdx: 0, correct: 'i' },
  { text: 'kob_lka hopsá', valIdx: 0, correct: 'y' },
  { text: 'mnoho drahých b_tů', valIdx: 0, correct: 'y' },
  { text: 'vyb_há z bloků', valIdx: 1, correct: 'í' },
  { text: 'nab_zíme zboží', valIdx: 1, correct: 'í' },
  { text: 'dětské nádob_čko', valIdx: 1, correct: 'í' },
  { text: 'zb_tečně vstával', valIdx: 0, correct: 'y' },
  { text: 'zlob_l se', valIdx: 0, correct: 'i' },
  { text: 'sb_rka známek', valIdx: 1, correct: 'í' },
  { text: 'b_t unavený', valIdx: 1, correct: 'ý' },
  { text: 'silný b_č', valIdx: 0, correct: 'i' },
  { text: 'neb_dlím tam', valIdx: 0, correct: 'y' },
  { text: 'B_džov', valIdx: 0, correct: 'y' },
  { text: 'bab_ka', valIdx: 0, correct: 'y' },
  { text: 'voják dob_l území', valIdx: 0, correct: 'y' },
  { text: 'pob_l mouchy', valIdx: 0, correct: 'i' },
];

const View = ({ options }) => (<div className="problem">{dictionary[options.i].text}</div>);

// method of selecting questions: 0: pick from 'wrong' array, 1: pick from 'slow' array, 2: generate new
// method with higher number is always fallback for the current one
const methods = [0, 0, 1, 2];

export const wIYb = new Module({
  routeName: 'w-iy-b',
  title: 'i/y po B',
  subtitle: 'vyjmenovaná slova',
  onActivate: (ctx, options) => {
    const store = options.store || {};
    const { wrong, slow } = store;
    ctx.prev = [];
    ctx.wrong = [...(wrong || [])];
    ctx.slow = [...(slow || [])];
    return {};
  },
  next: (ctx) => {
    let found = false;
    let index;
    let vals;
    let v1;
    let v2;
    let c;
    let idx;
    let method;
    while (!found) {
      method = methods[randomInt(methods.length)];
      if (method === 0) {
        if (ctx.wrong.length) {
          idx = randomInt(ctx.wrong.length);
          index = ctx.wrong[idx].i;
          v1 = ctx.wrong[idx].v1; // eslint-disable-line prefer-destructuring
          v2 = ctx.wrong[idx].v2; // eslint-disable-line prefer-destructuring
          c = ctx.wrong[idx].r;
        } else {
          method = 1;
        }
      }
      if (method === 1) {
        if (ctx.slow.length) {
          idx = randomInt(ctx.slow.length);
          index = ctx.slow[idx].i;
          v1 = ctx.slow[idx].v1; // eslint-disable-line prefer-destructuring
          v2 = ctx.slow[idx].v2; // eslint-disable-line prefer-destructuring
          c = ctx.slow[idx].r;
        } else {
          method = 2;
        }
      }
      if (method === 2) {
        idx = randomInt(dictionary.length);
        index = idx;
        vals = values[dictionary[idx].valIdx];
        v1 = vals.val1;
        v2 = vals.val2;
        c = dictionary[idx].correct;
      }
      found = true;
      // unique test: make sure there is enough unique problems!
      for (let i = 0; i < ctx.prev.length; i += 1) {
        const prev = ctx.prev[i];
        if (prev.i === index) { found = false; }
      }
      if (method === 0) { ctx.wrong.splice(idx, 1); }
      if (method === 1) { ctx.slow.splice(idx, 1); }
    }
    ctx.prev.push({ i: index });
    return {
      i: index,
      v1,
      v2,
      c,
    };
  },
  View,
});
