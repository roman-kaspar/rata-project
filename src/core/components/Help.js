import React from 'react';
import { connect } from 'react-redux';

import { HelpButton } from './HelpButton';
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
      Aplikace je zdarma, včetně zdrojového kódu, který je veřejně dostupný na GitHubu.
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
      <li>kategorie "matematika / celočíselné počítání do sta"</li>
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
