import React from 'react';

export const Help = () => (
  <>
    <p>
      Tato kategorie slouží na procvičování malé násobilky, sčítání a odčítání.
    </p>
    <p>
      Každý modul generuje náhodně 15 příkladů, přičemž bere v potaz takové,
      které byly v minulosti zodpovězeny špatně nebo pomalu.
    </p>
    <p>
      Limity pro rychlé odpovědi:
    </p>
    <ul>
      <li>násobení / čísla do pěti: 4s</li>
      <li>násobení / čísla do deseti: 4s</li>
      <li>sčítání / čísla do sta: 5s</li>
      <li>odčítání / čísla do sta: 5s</li>
    </ul>
  </>
);
