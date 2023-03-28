import {
    WEAPONS,
    ARMORS,
    DISTANCE_WEAPONS,
    EQUIPEMENT,
    TYPES
 } from "./weapons.js";


 const elements = {
    anciennete: document.getElementById('anciennete'),
    mj: document.getElementById('mj'),
    tirage: document.getElementById('tirage'),
    weapon: document.getElementById('weapon'),
    range: document.getElementById('range'),
    armor: document.getElementById('armor'),
    equipement: document.getElementById('equipement')
  };

const TABLE_DICTIONNARY = {
    weapon: WEAPONS,
    range: DISTANCE_WEAPONS,
    armor: ARMORS,
    equipement: EQUIPEMENT
  };
  
  const DICE_VALUES = {
    dice20: null,
    dice12: null,
    dice10: null,
    dice8: null
  };
  
  const INIT_DICES = {
    weapon: () => initDices('weapon'),
    range: () => initDices('range'),
    armor: () => initDices('armor'),
    equipement: () => initDices('equipement')
  };
  
  const DICES = [
    'weapon', 'range', 'armor', 'equipement'
  ];
  
  function disableEnableOption(entryToChange, valueToChange, disable = true) {
    if (valueToChange !== null) {
      DICES.filter(id => id !== entryToChange).forEach(idToChange => {
        const elementToChange = document.getElementById(idToChange);
        elementToChange.options.forEach(opt => {
          if (opt.value === valueToChange) {
            opt.disabled = disable;
          }
        });
      });
    }
  }
  
  function initDices(elementId) {
    const element = document.getElementById(elementId);
    const { value } = element;
    if (value !== null) {
      const key = Object.keys(DICE_VALUES).find(k => DICE_VALUES[k] === elementId);
      if (key) {
        DICE_VALUES[key] = null;
        disableEnableOption(elementId, key, false);
      }
      DICE_VALUES[value] = elementId;
      disableEnableOption(elementId, value, true);
    }
    delete DICE_VALUES.null;
  }
  
  function getTablesToRoll(dicesDetail) {
    const dice20 = TABLE_DICTIONNARY[dicesDetail.dice20];
    const dice12 = TABLE_DICTIONNARY[dicesDetail.dice12];
    const dice10 = TABLE_DICTIONNARY[dicesDetail.dice10];
    const dice8 = TABLE_DICTIONNARY[dicesDetail.dice8];
    return {
      dice20: { table: dice20, length: dice20.length },
      dice12: { table: dice12, length: dice12.length },
      dice10: { table: dice10, length: dice10.length },
      dice8: { table: dice8, length: dice8.length }
    };
  }
  
  function generateFourRandomNumbers() {
    return {
      dice20: Math.floor(Math.random() * 19) + 2,
      dice12: Math.floor(Math.random() * 11) + 2,
      dice10: Math.floor(Math.random() * 9) + 2,
      dice8: Math.floor(Math.random() * 7) + 2
    };
  }

    

function reset() {
    
    console.log("Reset");
    elements.tirage.innerText = '';
    elements.anciennete.value = 1;
    elements.mj.value = '';
    elements.econome.value = 'neutre';
    elements.weapon.value = null;
    elements.range.value = null;
    elements.armor.value = null;
    elements.equipement.value = null;
    for (const diceEntry of DICES) {
        for (const key of Object.keys(DICE_VALUES)) {
            disableEnableOption(diceEntry, key, false);
        }
    }
    for (const key of Object.keys(DICE_VALUES)) {
        DICE_VALUES[key] = null;
    }
}

function getManagerRelation(experience, tablesToRoll) {
    const relation = elements.econome.value;
    const firstRandomNumbers = generateFourRandomNumbers();
    let secondRandomNumbers;
    let finalObject;
  
    switch (relation) {
      case 'neutre': {
        finalObject = {
          dice20: Math.min(firstRandomNumbers.dice20 + experience, tablesToRoll.dice20.length - 1),
          dice12: Math.min(firstRandomNumbers.dice12 + experience, tablesToRoll.dice12.length - 1),
          dice10: Math.min(firstRandomNumbers.dice10 + experience, tablesToRoll.dice10.length - 1),
          dice8: Math.min(firstRandomNumbers.dice8 + experience, tablesToRoll.dice8.length - 1)
        };
        break;
      }
      case 'positive':
      case 'negative': {
        secondRandomNumbers = generateFourRandomNumbers();
        const maxMinFunc = relation === 'positive' ? Math.max : Math.min;
  
        finalObject = {
          dice20: Math.min(maxMinFunc(firstRandomNumbers.dice20, secondRandomNumbers.dice20) + experience, tablesToRoll.dice20.length - 1),
          dice12: Math.min(maxMinFunc(firstRandomNumbers.dice12, secondRandomNumbers.dice12) + experience, tablesToRoll.dice12.length - 1),
          dice10: Math.min(maxMinFunc(firstRandomNumbers.dice10, secondRandomNumbers.dice10) + experience, tablesToRoll.dice10.length - 1),
          dice8: Math.min(maxMinFunc(firstRandomNumbers.dice8, secondRandomNumbers.dice8) + experience, tablesToRoll.dice8.length - 1)
        };
        break;
      }
    }
  
    return finalObject;
  }

  function getEquipement() {
    const pageDices = DICE_VALUES;
    const hasNullValues = Object.values(pageDices).some(dice => dice === null);
  
    if (hasNullValues) {
        elements.tirage.innerText = 'Tous les dés ne sont pas attribués';
      return [];
    }
  
    const tablesToRoll = getTablesToRoll(pageDices);
    const managerRelation = getManagerRelation(Number(elements.anciennete.value), tablesToRoll);
  
    return [
      tablesToRoll.dice20.table[managerRelation.dice20],
      tablesToRoll.dice12.table[managerRelation.dice12],
      tablesToRoll.dice10.table[managerRelation.dice10],
      tablesToRoll.dice8.table[managerRelation.dice8]
    ];
  }
  
  function writeRoll() {
    checkValue(elements.anciennete, 10);
    checkValue(elements.mj, 20);
    const finalArray = getEquipement();
    const toWrite = [];
  
    for (const entry of finalArray) {
      if (Array.isArray(entry)) {
        for (const subEntry of entry) {
          const mapEntry = {
            [TYPES.specialEquipement]: () => `${subEntry.name} Δ${subEntry.dice} : ${subEntry.extra}`,
            [TYPES.equipement]: () => `${subEntry.name} Δ${subEntry.dice}`,
            [TYPES.item]: () => `${subEntry.name}`,
            [TYPES.specialItem]: () => `${subEntry.name} : ${subEntry.attributes}`
          };
  
          if (mapEntry[subEntry.type]) {
            toWrite.push(mapEntry[subEntry.type]());
          }
        }
      } else {
        const mapEntry = {
          [TYPES.armor]: () => `${entry.name} Δ${entry.dice}`,
          [TYPES.distanceWeapon]: () => `${entry.name} d${entry.dice}`,
          [TYPES.distanceWeaponWithAmmo]: () => `${entry.name} d${entry.dice} (${entry.ammo.name} Δ${entry.ammo.dice})`,
          [TYPES.weapon]: () => `${entry.name} d${entry.dice}${entry.hands === 2 ? `/d${entry.dice}*` : ''}`
        };
  
        if (mapEntry[entry.type]) {
          toWrite.push(mapEntry[entry.type]());
        }
      }
    }
  
    if (toWrite.length > 0) {
      elements.tirage.innerText = toWrite.join('\n');
    }
  }
  
  function checkValue(toCheck, max) {
    if (toCheck.value > max) {
      toCheck.value = max;
    } else if (toCheck.value < 1) {
      toCheck.value = 1;
    }
  }
  

  function initPage() {
    // Reset the page to its default state
    reset();
  
    // Set up the event listeners for each dropdown menu
    DICES.forEach(dice => {
      const element = document.getElementById(dice);
      element.addEventListener('change', INIT_DICES[dice]);
    });
  
    // Set up the event listener for the "Roll" button
    const rollButton = document.getElementById('run');
    rollButton.addEventListener('click', writeRoll);

    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', reset);
  }
  

  initPage();
