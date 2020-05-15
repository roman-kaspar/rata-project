import React from 'react';
import { connect } from 'react-redux';

import { HelpButton } from './HelpButton';
import { ExternalLink } from './ExternalLink';
import { PARAMS as ROUTE_PARAMS } from '../router/routes';
import {
  tsToStr,
  formatInt,
  bytesToStr,
  getCategAcc,
  getModuleAcc,
} from '../utils';
import { categories } from '../categories';
import { APP_NAME, VIEWS } from '../constants';
import { APP_KEY } from '../sagas/saga';

import './Help.css';

const TopLevelView = ({ data }) => (
  <div className="help">
    <h2>
      O aplikaci
    </h2>
    <p>
      <span className="bold">{APP_NAME}</span> slouží na procvičování školních příkladů.
    </p>
    <p>
      Je jistě spousta vzdělávacích mobilních aplikací pro děti, tak proč tahle další?
    </p>
    <p>
      Za prvé: většina aplikací je v angličtině.
      Není to úplně na škodu, ale může to být zbytečná bariéra.
    </p>
    <p>
      Za druhé: většina aplikací je zaměřená jednostranně na jeden předmět
      (počítání, jazyk, hudbu, ...), chtěl jsem napsat jednu aplikaci pro všechny předměty,
      kde je potřeba něco procvičovat.
    </p>
    <p>
      A za třetí: chtěl jsem, aby se moje děti mohly na tvorbě aplikace podílet, testovat ji,
      říct si, jak by měla vypadat. A také aby s nimi aplikace rostla,
      abychom mohli jednoduše dopsat cvičení dle jejich školních potřeb.
    </p>
    <p>
      Aplikace je určená pro mobilní telefony držené na výšku. Lze ji rozeběhnout i na
      počítači (otevřete stránku v prohlížeči a následujte instrukce).
    </p>

    <h2>
      Instalace
    </h2>
    <p>
      Pokud máte aplikaci otevřenou v prohlížeči mobilního telefonu, pravděpodobně nevyužívá
      celou plochu obrazovky. V takovém případě v nabídce (sdílení) stránky vyberte
      možnost "Přidat na plochu" (nebo její ekvivalent).
      Takto nainstalovanou aplikaci potom otevřete.
    </p>
    <p>
      Aplikace funguje i bez přístupu na internet.
    </p>

    <h2>
      Aktualizace
    </h2>
    <p>
      Aplikace automaticky kontroluje, zda je k dispozici její nová verze (s novými příklady
      či jinými vylepšeními). Pokud ano, symbol žárovky na úvodní stránce změnou barvy
      na novou verzi upozorní. Stisknutím tohoto symbolu se nová verze nainstaluje.
    </p>
    <p>
      Stejně tak se nová verze aplikace nainstaluje automaticky při novém spuštění aplikace
      (v případě, že je telefon online a nová verze aplikace je k dispozici).
    </p>

    <h2>
      Struktura
    </h2>
    <p>
      Aplikace se skladá se z kategorií (ty odpovídají jednotlivým tématům učebních předmětů)
      a jednotlivé kategorie se skládají ze cvičebních modulů.
    </p>
    <p>
      Každý modul vygeneruje několik příkladů a pro každý načte odpověď. Poté vyhodnotí
      správnost a rychlost odpovědí. Počet příkladů i délka limitu pro rychlou
      odpověď se pro jednotlivé moduly liší.
    </p>
    <p>
      Několik posledních kol cvičení se zapamatuje (aby se mohl například rodič později
      podívat, jak to jeho potomkovi šlo). Informace o výsledcích jsou dostupné z hlavní
      nabídky, tak i z nabídek jednotlivých kategorií.
    </p>

    <h2>
      Hvězdy
    </h2>
    <p>
      Za každý modul je možné získat tři hvězdy.
    </p>
    <p>
      První za to, když jsou všechny úlohy zodpovězeny správně.
    </p>
    <p>
      Druhou za to, když jsou všechny úlohy zodpovězeny správně a rychle k tomu (tj. první dvě
      hvězdy lze získat současně).
    </p>
    <p>
      Třetí hvězda je za opakované zodpovězení všech úloh správně a rychle, a to třikrát v řadě.
    </p>

    <h2>
      Nápověda kategorií
    </h2>
    <p>
      Aktuální verze aplikace obsahuje:
    </p>
    <ul>
      <li>{getCategAcc(data.categories.length)}</li>
      <li>{getModuleAcc(data.modules)}</li>
    </ul>
    <p>
      Nápověda jednotlivých kategorií:
    </p>
    <p>
      {
        data.categories.map((cat, idx) => (
          <HelpButton key={idx} params={{
            ...cat,
            routeParams: { back: ROUTE_PARAMS.BACK.TOP },
          }} />
        ))
      }
    </p>
    <h2>
      Technické informace
    </h2>
    <p>
      Aplikace je zdarma, včetně zdrojového kódu, který je veřejně dostupný
      na <ExternalLink target="https://github.com/roman-kaspar/rata-project">
        GitHubu <svg
          style={{ marginBottom: '-2px', width: '18px', height: '18px' }}
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"
        >
          <path d="M1000 508c0 232-160 429-375 485v-131c0-41-10-98-52-131 134-20 239-99 239-223 0-51-21-102-58-144
            11-47 17-105-4-148-53 5-106 32-145 56-33-8-67-14-105-14s-73 6-106 14c-39-24-91-51-144-56-21 43-16 101-5
            148-37 42-57 93-57 144 0 124 105 203 239 223-20 15-32 36-40 57-105 2-189-81-190-81-5-4-12-5-16-2-6 3-9
            10-7 16 2 5 44 124 201 172v100c-215-56-375-253-375-485 0-275 223-500 500-500 275 0 500 225 500 500z">
          </path>
        </svg>
      </ExternalLink>.
    </p>
    <p>
      <HelpButton className="tech" params={{
        title: 'historie změn',
        routeParams: { changelog: true },
      }} />
      <HelpButton className="tech" params={{
        title: 'systémové informace',
        routeParams: { system: true },
      }} />
    </p>
    <p>Copyright © 2020 Roman Kašpar</p>
  </div>
);

const ChangeLogView = () => (
  <div className="help">
    <h2>1.4.4</h2>
    <ul>
      <li>publikováno: 15.5.2020</li>
      <li>modul "vyjmenovaná slova po Z"</li>
      <li>externí GitHub link v nápovědě</li>
      <li>anglický text pro web-view</li>
    </ul>
    <h2>1.4.1</h2>
    <ul>
      <li>publikováno: 16.4.2020</li>
      <li>modul "vyjmenovaná slova po V"</li>
    </ul>
    <h2>1.4.0</h2>
    <ul>
      <li>publikováno: 14.4.2020</li>
      <li>přepracovaný systém vyhodnocování odpovědí</li>
      <li>podpora pro migrace uložených dat</li>
      <li>drobná vylepšení stylování výsledkových obrazovek</li>
    </ul>
    <h2>1.3.1</h2>
    <ul>
      <li>publikováno: 13.4.2020</li>
      <li>korekce slovníku podstatných jmen</li>
    </ul>
    <h2>1.3.0</h2>
    <ul>
      <li>publikováno: 12.4.2020</li>
      <li>kategorie "český jazyk / gramatické jevy"</li>
      <li>modul "podstatná jména / skloňování: číslo, rod, pád"</li>
    </ul>
    <h2>1.2.6</h2>
    <ul>
      <li>publikováno: 18.3.2020</li>
      <li>modul "vyjmenovaná slova po S"</li>
      <li>unit testy pro slovníkové moduly</li>
    </ul>

    <h2>1.2.5</h2>
    <ul>
      <li>publikováno: 17.3.2020</li>
      <li>modul "sčítání / čísla do tisíce"</li>
      <li>modul "odčítání / čísla do tisíce"</li>
    </ul>

    <h2>1.2.3</h2>
    <ul>
      <li>publikováno: 8.3.2020</li>
      <li>opravy chyb ve slovnících modulů češtiny</li>
      <li>změna hostingu aplikace na nový server</li>
    </ul>

    <h2>1.2.2</h2>
    <ul>
      <li>publikováno: 11.2.2020</li>
      <li>modul "vyjmenovaná slova po P"</li>
      <li>vylepšení výsledkové stránky</li>
      <li>znemožnění zadání prázdné odpovědi</li>
    </ul>

    <h2>1.2.1</h2>
    <ul>
      <li>publikováno: 21.1.2020</li>
      <li>modul "vyjmenovaná slova po L"</li>
      <li>modul "vyjmenovaná slova po M"</li>
      <li>drobné opravy</li>
    </ul>

    <h2>1.2.0</h2>
    <ul>
      <li>publikováno: 15.1.2020</li>
      <li>kategorie "český jazyk / doplňování písmen"</li>
      <li>modul "vyjmenovaná slova po B"</li>
    </ul>

    <h2>1.1.5</h2>
    <ul>
      <li>publikováno: 14.1.2020</li>
      <li>modul "sčítání / čísla do dvaceti"</li>
      <li>modul "odčítání / čísla do dvaceti"</li>
      <li>modul "dělení / čísla do pěti"</li>
      <li>modul "dělení / čísla od šesti do deseti"</li>
      <li>úpravy stylů</li>
    </ul>

    <h2>1.1.4</h2>
    <ul>
      <li>publikováno: 13.1.2020</li>
      <li>nápověda</li>
      <li>restrukturalizace a optimizace kódu</li>
      <li>nové ikony aplikace pro iOS a android</li>
    </ul>

    <h2>1.1.1</h2>
    <ul>
      <li>publikováno: 2.1.2020</li>
      <li>počítání a oznamování hvězd a nejlepších výkonů</li>
    </ul>

    <h2>1.1.0</h2>
    <ul>
      <li>publikováno: 23.11.2019</li>
      <li>nasazení na veřejný server</li>
      <li>offline mód</li>
      <li>(automatické) aktualizace aplikace</li>
    </ul>

    <h2>1.0.1</h2>
    <ul>
      <li>publikováno: 10.11.2019</li>
      <li>modul "malá násobilka / čísla od šesti do deseti"</li>
      <li>modul "sčítání / čísla do sta"</li>
      <li>modul "odčítání / čísla do sta"</li>
    </ul>

    <h2>1.0.0</h2>
    <ul>
      <li>publikováno: 3.11.2019</li>
      <li>kategorie "matematika / celočíselné počítání"</li>
      <li>modul "malá násobilka / čísla do pěti"</li>
      <li>zpracování výsledků (dobře / dobře ale pomalu / špatně)</li>
    </ul>
  </div>
);

const SystemView = ({ store, viewport, storageBytes }) => (
  <div className="help">
    <ul>
      <li>nainstalováno: {tsToStr(store[APP_KEY].installed)}</li>
      <li>spuštěno: {formatInt(store[APP_KEY].opened)}x</li>
      <li>poslední start aplikace: {tsToStr(store[APP_KEY].openedLast)}</li>
      <li>local storage: {bytesToStr(storageBytes)}</li>
      <li>rozlišení obrazovky: {viewport.width} x {viewport.height} bodů</li>
      { /* data.uuid */ }
    </ul>
  </div>
);

const CategoryView = ({ data }) => {
  const Inner = data.View;
  return (<div className="help"><Inner /></div>);
};

const HelpView = ({
  route,
  store,
  viewport,
  storageBytes,
}) => {
  const [ignore, categ] = route.name.split('.'); // eslint-disable-line no-unused-vars
  const { view, data } = categories.help(categ, route.params);
  let HelpComp = TopLevelView;
  if ((view === VIEWS.TOP) && (route.params && route.params.changelog)) { HelpComp = ChangeLogView; }
  if ((view === VIEWS.TOP) && (route.params && route.params.system)) { HelpComp = SystemView; }
  if (view === VIEWS.CAT) { HelpComp = CategoryView; }
  return (<HelpComp data={data} store={store} viewport={viewport} storageBytes={storageBytes} />);
};

const mapStateToProps = (state) => ({
  store: state.app.storage,
  storageBytes: state.app.storageBytes,
  viewport: state.app.viewport,
});

export const Help = connect(mapStateToProps)(HelpView);
