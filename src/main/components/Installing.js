import React from 'react';
import './Installing.css';

export const Installing = (props) => {
  const { version, abort } = props;
  return (
    <div className="installing">
      <div>
        Aplikace se právě aktualizuje na novou verzi ({version}).
        Po dokončení instalace se program spustí automaticky.
      </div>
      <div>
        Mějte prosím chvíli strpení, při pomalejším internetovém připojení to chvilku potrvá.
      </div>
      <div>
        Aktualizaci můžete kdykoli přerušit, stávající verze programu zůstane funkční.
      </div>

      <button type="button" onClick={abort}>přerušit aktualizaci</button>
    </div>
  );
};
