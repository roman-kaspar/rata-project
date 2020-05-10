import React from 'react';
import './Mobile.css';

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
  <>
    <div className="mobile-error">
      Tento program je určený výhradně pro mobilní telefony držené na výšku.
      Otevřete tuto stránku v prohlížeči na mobilním telefonu a v nabídce
      (sdílení) stránky vyberte možnost "Přidat na plochu" (nebo její ekvivalent).
      Takto nainstalovanou aplikaci potom otevřete.
    </div>
    <div className="mobile-error">
      Pokud i poté vidíte tuto obrazovku, napište mi prosím email
      na <span className="bold">roman.kaspar@seznam.cz</span>, kde
      uveďte <span className="bold">model telefonu</span> a aktuální rozlišení
      obrazovky: <span className="bold">{width}x{height}</span>.
    </div>
    <div className="mobile-error">
      Pokud chcete aplikaci používat na jiném zařízení (například na počítači),
      upravte prosím velikost obrazu tak, aby mobilnímu telefonu odpovídala.
      Stránku otevřte například v prohlížeči Google Chrome, z menu aktivujte
      Nástroje pro vývojáře (Developer Tools), zapněte simulátor mobilních
      zařízení a z nabídky vyberte třeba "iPhone 6/7/8". Aplikace by potom
      v tomto režimu měla fungovat i na počítači.
    </div>
    <div className="mobile-error">
      Děkujeme za pochopení.
    </div>
    <hr className="mobile-error" />
    <div className="mobile-error english">
      This is an educational application for children. It is meant for mobile devices only,
      that's why you see this message now. Please open the page on your mobile device,
      or resize the window of your browser to match the screen resolution of a phone
      (e.g. using Developer Tools of Google Chrome desktop browser).
    </div>
    <div className="mobile-error english">
      Also, the application is in Czech only. It is for children attending Czech elementary
      schools, so having it translated into more languages doesn't make too much sense.
      But you can still give it a try, some subjects (e.g. mathematics) are the same in
      all the languages :-).
    </div>
    <div className="mobile-error english">
      Thank you for your understanding.
    </div>
  </>
);

export const MobilePortraitOnly = () => (
  <>
    <div className="mobile-error">
      Tento program je určený výhradně pro mobilní telefony držené na výšku.
      Otočte prosím svůj telefon do této polohy.
    </div>
    <div className="mobile-error">
      Děkujeme za pochopení.
    </div>
  </>
);
