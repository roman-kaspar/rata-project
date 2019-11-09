const days = [
  'neděle',
  'pondělí',
  'úterý',
  'středa',
  'čtvrtek',
  'pátek',
  'sobota',
];

const daysPrep = [
  'v neděli',
  'v pondělí',
  'v úterý',
  've středu',
  've čtvrtek',
  'v pátek',
  'v sobotu',
];

const hourPrep = (hour) => {
  if (hour < 2) { return 'v'; }
  if (hour < 5) { return 've'; }
  if (hour < 12) { return 'v'; }
  if (hour < 15) { return 've'; }
  if (hour < 20) { return 'v'; }
  return 've';
};

export const tsToStr = (ts, prep = true) => {
  if (!ts) { return 'nikdy'; }
  const tsObj = new Date(ts);
  const tsTime = `${tsObj.getHours().toString().padStart(2, '0')}:${tsObj.getMinutes().toString().padStart(2, '0')}`;
  const tsDate = `${tsObj.getDate()}.${tsObj.getMonth() + 1}.`;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (ts >= today.valueOf()) { return `dnes v ${tsTime}`; }
  const yesterday = new Date(today.valueOf() - 24 * 60 * 60 * 1000);
  if (ts >= yesterday.valueOf()) { return `včera ${hourPrep(tsObj.getHours())} ${tsTime}`; }
  const sixDaysBack = new Date(today.valueOf() - 6 * 24 * 60 * 60 * 1000);
  if (ts >= sixDaysBack.valueOf()) {
    return `${(prep ? daysPrep : days)[tsObj.getDay()]} ${hourPrep(tsObj.getHours())} ${tsTime}`;
  }
  const yearBack = new Date(today.valueOf() - 355 * 24 * 60 * 60 * 1000);
  if (ts >= yearBack.valueOf()) { return `${tsDate} ${hourPrep(tsObj.getHours())} ${tsTime}`; }
  return `${tsDate}${tsObj.getFullYear()} ${hourPrep(tsObj.getHours())} ${tsTime}`;
};

export const formatInt = (int) => {
  const arr = int.toString().split('');
  const res = [];
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (res.length % 4 === 0) { res.push(' '); }
    res.push(arr[i]);
  }
  return res.reverse().join('').trim();
};

export const msToStr = (ms) => {
  if (ms < 60000) { return `${(ms / 1000).toFixed(1)} s`.replace('.', ','); }
  const secs = Math.round(ms / 1000);
  const mins = Math.floor(secs / 60);
  const hrs = Math.floor(mins / 60);
  if (!hrs) { return `${mins}:${(secs % 60).toString().padStart(2, '0')}`; }
  return `${hrs}:${(mins % 60).toString().padStart(2, '0')}:${(secs % 60).toString().padStart(2, '0')}`;
};
