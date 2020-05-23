import { dictionary as dictNouns } from './module-nouns';
import { dictionary as dictVerbs } from './module-verbs';

const testDictionary = (dict, opts, highlight = false) => {
  const rx = /\*/g;
  const max = opts.length;
  dict.forEach((item) => {
    expect(typeof item).toBe('object');
    expect(typeof item.text).toBe('string');
    expect(Array.isArray(item.resp)).toBeTruthy();
    expect(item.text.length).toBeLessThan(26);
    if (highlight) {
      const matches = item.text.match(rx);
      expect(matches).toBeTruthy();
      expect(matches.length).toEqual(2);
    }
    expect(item.resp.length).toEqual(opts.length);
    for (let i = 0; i < max; i += 1) { expect(item.resp[i]).toBeLessThan(opts[i]); }
  });
};

it('tests dictionaty of module-nouns', () => { testDictionary(dictNouns, [2, 4, 7], true); });
it('tests dictionaty of module-verbs', () => { testDictionary(dictVerbs, [3, 2, 3]); });
