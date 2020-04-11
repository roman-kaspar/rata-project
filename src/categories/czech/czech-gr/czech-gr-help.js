import React from 'react';

export const Help = () => (
  <>
    <p>
      Tato kategorie slouží na procvičování gramatických jevů.
    </p>
    <p>
      Každý modul vybere ze slovníku náhodně 15 slovních spojení, přičemž bere v potaz taková,
      která byla v minulosti zodpovězena špatně nebo pomalu. U zvýrazněných slov těchto slovních
      spojení se pak určují gramatické jevy.
    </p>
    <p>
      Limity pro rychlé odpovědi:
    </p>
    <ul>
      <li>podstatná jména (skloňování): 5s</li>
      <li>sloves (časování ): 5s</li>
    </ul>
  </>
);
