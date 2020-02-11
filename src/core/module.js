export class Module {
  // props:
  // + routeName: string
  // + title: string
  // - subtitle: string || undefined
  // - onActivate: (ctx, options) => {} || undefined
  // - onDeactivate: (ctx, options) => {} || undefined
  // + next: (ctx) => ({})
  // + View: React component
  constructor(props) {
    this._props = props;
  }

  routeName() { return this._props.routeName; }

  title() {
    const { title, subtitle } = this._props;
    return { title, subtitle };
  }

  route() {
    const { routeName, title, subtitle } = this._props;
    return {
      name: routeName,
      title,
      subtitle,
      path: `/${routeName}`,
    };
  }

  onActivate(options) {
    const { onActivate } = this._props;
    if (onActivate) { return onActivate(this, options); }
    return null;
  }

  onDeactivate(options) {
    const { onDeactivate } = this._props;
    if (onDeactivate) { onDeactivate(this, options); }
  }

  next() {
    return this._props.next(this);
  }

  view() {
    return this._props.View;
  }

  usage(storage) {
    const res = {
      finished: 0,
      lastTime: 0,
      stars: 0,
    };
    if (storage) {
      res.finished = storage.finished.count;
      res.lastTime = storage.finished.updated;
      res.stars = storage.stars.count;
      if (storage.runs && storage.runs.length) {
        const lastRun = storage.runs[storage.runs.length - 1];
        res.lastResult = {
          correct: lastRun.correct,
          total: storage.exercises,
          slow: lastRun.slow,
          time: lastRun.time,
        };
      }
    }
    return res;
  }
}
