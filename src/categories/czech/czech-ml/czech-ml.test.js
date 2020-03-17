import { dictionary as dictB } from './module-w-iy-b';
import { dictionary as dictL } from './module-w-iy-l';
import { dictionary as dictM } from './module-w-iy-m';
import { dictionary as dictP } from './module-w-iy-p';
import { dictionary as dictS } from './module-w-iy-s';

const correct2idx = {
  i: 0,
  y: 0,
  í: 1,
  ý: 1,
};

const testDictionary = (dict, letter) => {
  const rx1 = new RegExp('_', 'g');
  const rx2 = new RegExp(`${letter}_`, 'ig');
  dict.forEach((item) => {
    expect(typeof item).toBe('object');
    const matches1 = item.text.match(rx1);
    expect(matches1).toBeTruthy();
    expect(matches1.length).toEqual(1);
    const matches2 = item.text.match(rx2);
    expect(matches2).toBeTruthy();
    expect(matches2.length).toEqual(1);
    const idx = correct2idx[item.correct];
    expect(typeof idx).toBe('number');
    expect(item.valIdx).toEqual(idx);
  });
};

it('tests dictionaty of module-w-iy-b', () => { testDictionary(dictB, 'b'); });
it('tests dictionaty of module-w-iy-l', () => { testDictionary(dictL, 'l'); });
it('tests dictionaty of module-w-iy-m', () => { testDictionary(dictM, 'm'); });
it('tests dictionaty of module-w-iy-p', () => { testDictionary(dictP, 'p'); });
it('tests dictionaty of module-w-iy-s', () => { testDictionary(dictS, 's'); });
