import React from 'react';
import { connect } from 'react-redux';

import { ResultButton } from '../../shared/ResultButton';
import { params as RouteParams } from '../router/routes';
import { tsToStr, msToStr, formatInt } from '../../shared/utils';
import { categories } from '../../categories/categories';
import { Icons } from '../../shared/Icons';
import { RESULT_VIEWS } from './const';

import './Results.css';

const TopLevelView = ({ data }) => {
  let last;
  if (data.lastName) { last = data.categories.find((cat) => (cat.routeName === data.lastName)); }
  return (
    <div className="results">
      {/* TODO: move this to bottom of global Help
      -----
        <div>+ nainstalováno: {tsToStr(data.installed)}</div>
        <div>+ spuštění: {formatInt(data.opened)}</div>
        <div>+ kategorie: {formatInt(data.categories.length)}</div>
        <div>+ moduly: {formatInt(data.modules)}</div>
      -----
      */}
      <ul>
        <li>dokončená cvičení: {formatInt(data.finished)}</li>
        <li>hvězdy: {formatInt(data.stars)} / {formatInt(3 * data.modules)}</li>
      </ul>

      {last && (data.categories.length > 2) && (
        <>
          <h2>naposledy použité:</h2>
          <ResultButton className="last" params={{
            title: last.title,
            subtitle: last.subtitle,
            routeName: last.routeName,
            lastTime: last.usage.lastTime,
            routeParams: { back: RouteParams.BACK.TOP },
          }} />
        </>
      )}

      <h2>výsledky kategorií:</h2>
      {data.categories.map((cat) => (
        <ResultButton key={cat.routeName} params={{
          title: cat.title,
          subtitle: cat.subtitle,
          routeName: cat.routeName,
          lastTime: cat.usage.lastTime,
          routeParams: { back: RouteParams.BACK.TOP },
        }} />
      ))}
    </div>
  );
};

const CategoryView = ({ categ, data }) => {
  let last;
  if (data.lastName) { last = data.modules.find((mod) => (mod.routeName === data.lastName)); }
  return (
    <div className="results">
      <ul>
        <li>dokončená cvičení: {formatInt(data.finished)}</li>
        <li>hvězdy: {formatInt(data.stars)} / {formatInt(3 * data.modules.length)}</li>
      </ul>

      {last && (data.modules.length > 2) && (
        <>
          <h2>naposledy použité:</h2>
          <ResultButton className="last" params={{
            title: last.title,
            subtitle: last.subtitle,
            routeName: `${categ}.${last.routeName}`,
            lastTime: last.usage.lastTime,
            routeParams: { ...(data.routeParams) },
          }} />
        </>
      )}

      <h2>výsledky modulů:</h2>
      {data.modules.map((mod) => (
        <ResultButton key={mod.routeName} params={{
          title: mod.title,
          subtitle: mod.subtitle,
          routeName: `${categ}.${mod.routeName}`,
          lastTime: mod.usage.lastTime,
          routeParams: { ...(data.routeParams) },
        }} />
      ))}
    </div>
  );
};

const ProblemsView = (options) => {
  const { categ, module } = options;
  const { data, type } = options;
  if (!data || !data[type] || (!data[type].length)) {
    return (<div className="results"><p>data nejsou bohužel k dispozici</p></div>);
  }
  const arr = data[type];
  const View = categories.moduleView(categ, module);
  return (
    <div className="results">
      <h2>problémové příklady: {(type === 'slow' ? 'rychlost' : 'správnost')}</h2>
      <ul>
        {
          arr.map((item, idx) => (
            <li key={idx}>
              <View options={item} />&nbsp;=&nbsp;{item.r.toString()}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

const getIcon = (correct, slow) => {
  if (!correct) { return { Icon: Icons.ResultWrong, cx: 'wrong' }; }
  if (slow) { return { Icon: Icons.ResultSlow, cx: 'slow' }; }
  return { Icon: Icons.ResultCorrect, cx: 'correct' };
};

const RunView = (options) => {
  const { routeParams, runs } = options.data;
  const { stars, best } = options.data;
  const idx = ((runs && runs.length) || 0) - 1 - ((routeParams.run === -1) ? 0 : routeParams.run);
  if (Number.isNaN(idx) || (idx < 0)) {
    return (<div className="results"><p>data nejsou bohužel k dispozici</p></div>);
  }
  const { categ, module } = options;
  const View = categories.moduleView(categ, module);
  const run = runs[idx];
  const praises = ['výborně', 'skvěle', 'super', 'paráda', 'výtečně', 'dokonale', 'úžasně'];
  const praiseStar = praises[Math.floor(Math.random() * praises.length)];
  const praiseBest = praises[Math.floor(Math.random() * praises.length)];
  return (
    <div className="results">
      {
        (routeParams.run === -1)
        && (stars.updated === run.finished)
        && (<h2>{praiseStar}! za tenhle výkon získáváš další hvězdu!</h2>)
      }
      {
        (routeParams.run === -1)
        && (best.updated === run.finished)
        && (<h2>{praiseBest}! tohle byl tvůj nejlepší výkon!</h2>)
      }
      <ul>
        <li>dokončeno: {tsToStr(run.finished)}</li>
        <li>v čase: {msToStr(run.time)}</li>
        <li>správných výsledků: {formatInt(run.correct)}</li>
        <li>špatných výsledků: {formatInt(run.elems.length - run.correct)}</li>
        <li>správných, ale pomalu: {formatInt(run.slow)}</li>
      </ul>
      <h2>příklady:</h2>
      <table><tbody>
        {
          run.elems.map((row, index) => {
            const { Icon, cx } = getIcon(row.correct, row.slow);
            return (
              <tr key={index}>
                <td><Icon className={cx} /></td>
                <td><View options={row} /></td>
                <td>=</td>
                <td>{row.resp} {row.correct ? '' : `(${row.r.toString()})`}</td>
              </tr>
            );
          })
        }
      </tbody></table>
    </div>
  );
};

const ModuleView = (options) => {
  const { categ, module, data } = options;
  const finished = data.finished && data.finished.count;
  if (!finished) {
    return <div className="results"><p>tento modul nebyl ještě nikdy použit</p></div>;
  }
  // extra route params
  if (data.routeParams && data.routeParams.wrong) { return ProblemsView({ ...options, type: 'wrong' }); }
  if (data.routeParams && data.routeParams.slow) { return ProblemsView({ ...options, type: 'slow' }); }
  if (data.routeParams && (data.routeParams.run !== undefined)) { return RunView(options); }
  //
  return (
    <div className="results">
      <ul>
        <li>dokončená cvičení: {formatInt(finished)}</li>
        <li>naposledy: {tsToStr(data.finished.updated)}</li>
      </ul>
      <ul>
        <li>hvězdy: {formatInt(data.stars.count)} / 3</li>
        { (data.stars.count !== 0) && (
          <li>poslední získána: {tsToStr(data.stars.updated)}</li>
        )}
      </ul>
      { (data.best.time !== -1) && (
        <ul>
          <li>nejlepší výsledek: {data.best.correct} / {data.exercises}</li>
          <li>v čase: {msToStr(data.best.time)}</li>
          <li>dosažen: {tsToStr(data.best.updated)}</li>
        </ul>
      )}
      { (data.wrong.length > 0) && (
        <ResultButton className="problems" params={{
          title: 'problémy: správnost',
          subtitle: `počet: ${data.wrong.length}`,
          routeName: `${categ}.${module}`,
          routeParams: { ...(data.routeParams), wrong: true },
        }} />
      )}
      { (data.slow.length > 0) && (
        <ResultButton className="problems" params={{
          title: 'problémy: rychlost',
          subtitle: `počet: ${data.slow.length}`,
          routeName: `${categ}.${module}`,
          routeParams: { ...(data.routeParams), slow: true },
        }} />
      )}
      { [...(data.runs)].reverse().map((run, idx) => (
        <ResultButton key={run.finished} params={{
          title: tsToStr(run.finished, false),
          subtitle: `správně: ${run.correct} / ${data.exercises}; pomalu: ${run.slow}; čas: ${msToStr(run.time)}`,
          routeName: `${categ}.${module}`,
          routeParams: { ...(data.routeParams), run: idx },
        }} />
      ))}
    </div>
  );
};

const ResultsView = ({ route, categs, store }) => {
  const [ignore, categ, module] = route.name.split('.'); // eslint-disable-line no-unused-vars
  const { View, data } = categs.results(categ, module, route.params, store);
  let Result = TopLevelView;
  if (View === RESULT_VIEWS.CAT) { Result = CategoryView; }
  if (View === RESULT_VIEWS.MOD) { Result = ModuleView; }
  return (<Result categ={categ} module={module} data={data} />);
};

const mapStateToProps = (state) => ({
  store: state.app.storage,
});

export const Results = connect(mapStateToProps)(ResultsView);
