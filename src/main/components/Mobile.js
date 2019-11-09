import React from 'react';

// dimensions taken from https://mediag.com/blog/popular-screen-resolutions-designing-for-all/
const WMIN = 300; // 320; iPhone 5
const WMAX = 480;
const HMIN = 454; // 568; iPhone 5
const HMAX = 896;

const checkOneDim = (dim, min, max) => ((dim >= min) && (dim <= max));

export const isMobile = ({ width, height }) => (
  (checkOneDim(width, WMIN, WMAX) && checkOneDim(height, HMIN, HMAX))
  || (checkOneDim(height, WMIN, WMAX) && checkOneDim(width, HMIN, HMAX))
);

export const isMobilePortrait = ({ width, height }) => (
  checkOneDim(width, WMIN, WMAX) && checkOneDim(height, HMIN, HMAX)
);

export const MobileOnly = ({ width, height }) => (
  <div className="mobile-error">
    Tento program je určený výhradně pro mobilní telefony držené na výšku.
    Pokud jej chcete používat na jiném zařízení, upravte prosím velikost
    obrazu tak, aby mobilnímu telefonu odpovídala. Rozlišení tohoto zařízení
    je {width} x {height} bodů, což neodpovídá podporovaným telefonům. Děkujeme za pochopení.
  </div>
);

export const MobilePortraitOnly = () => (
  <div className="mobile-error">
    Tento program je určený výhradně pro mobilní telefony držené na výšku.
    Otočte prosím svůj telefon do této polohy. Děkujeme za pochopení.
  </div>
);
