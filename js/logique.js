import {
    WEAPONS,
    ARMORS,
    DISTANCE_WEAPONS,
    EQUIPEMENT,
    TYPES,
    SPECIAL_EQUIPEMENT
 } from "./weapons.js";

let elements = {};

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

const DICES = ['weapon', 'range', 'armor', 'equipement'];

function disableEnableOption (entryToChange, valueToChange, disable = true) {    
    try {
        if (JSON.parse(valueToChange) === null) {
            return;
        }
    } catch (e) {
        // do nothing
    }
    if (valueToChange !== null) {
        DICES.filter(id => id !== entryToChange).map(idToChange => {
            const elementToChange = document.getElementById(idToChange);
            [...elementToChange.options].map(opt => {
                if (opt.value === valueToChange && valueToChange !== null) {
                    opt.disabled = disable;
                } 
            })
        })
    }
}

function initDices (elementId) {
    const element = document.getElementById(elementId);
    const {value} = element;
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

function getDiceDetails(dice) {
    return {
        table: TABLE_DICTIONNARY[dice],
        length: TABLE_DICTIONNARY[dice].length
    }
}

function getTablesToRoll () {
    return {
        dice20: getDiceDetails(DICE_VALUES.dice20),
        dice12: getDiceDetails(DICE_VALUES.dice12),
        dice10: getDiceDetails(DICE_VALUES.dice10),
        dice8: getDiceDetails(DICE_VALUES.dice8)
    }
}

function generateFourRandomNumbers () {
    return {
        dice20: Math.floor(Math.random() * (20 - 2 + 1)) + 2,
        dice12: Math.floor(Math.random() * (12 - 2 + 1)) + 2,
        dice10: Math.floor(Math.random() * (10 - 2 + 1)) + 2,
        dice8: Math.floor(Math.random() * (8 - 2 + 1)) + 2
    }
}

function getElements () {
    elements = {
        anciennete: document.getElementById('anciennete'),
        mj: document.getElementById('mj'),
        tirage: document.getElementById('tirage'),
        weapon: document.getElementById('weapon'),
        range: document.getElementById('range'),
        armor: document.getElementById('armor'),
        equipement: document.getElementById('equipement'),
        econome: document.getElementById('econome'),
        run: document.getElementById('run'),
        reset: document.getElementById('reset')
    };
}

function reset () {
    elements.tirage.innerText = '';
    elements.anciennete.value = 1;
    elements.mj.value = '';
    elements.econome.value = 'neutre';
    elements.weapon.value = null;
    elements.armor.value = null;
    elements.range.value = null;
    elements.equipement.value = null;

    DICES.map(diceEntry => {
        Object.keys(DICE_VALUES).map(key => {
            disableEnableOption(diceEntry, key, false);
        })
    })
    Object.keys(DICE_VALUES).map(key => {
        DICE_VALUES[key] = null;
    })
}

function getManagerRelation (experience, tablesToRoll) {
    const relation = elements.econome.value;
    const firstRandomNumbers = generateFourRandomNumbers();
    let secondRandomNumbers;
    let finalObject;
    switch (relation) {
        case 'neutre':
            finalObject = {
                dice20: Math.min(firstRandomNumbers.dice20 + experience, tablesToRoll.dice20.length - 1),
                dice12: Math.min(firstRandomNumbers.dice12 + experience, tablesToRoll.dice12.length - 1),
                dice10: Math.min(firstRandomNumbers.dice10 + experience, tablesToRoll.dice10.length - 1),
                dice8: Math.min(firstRandomNumbers.dice8 + experience, tablesToRoll.dice8.length - 1)
            }
        break;
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
        }
        break;
    }
    return finalObject;
}

function getEquipement() {
    if (Object.values(DICE_VALUES).some(dice => dice === null)) {
        elements.tirage.innerText = 'Tous les dés ne sont pas attribués'
        return [];
    }
    const tablesToRoll = getTablesToRoll(DICE_VALUES);
    const managerRelation = getManagerRelation(Number(elements.anciennete.value), tablesToRoll);

    if (managerRelation.dice20 == elements.mj.value) {
        const specialItemRoll = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
        elements.extraItem = SPECIAL_EQUIPEMENT[specialItemRoll];
    } else {
        elements.extraItem = null;
    }
    return [
        tablesToRoll.dice20.table[managerRelation.dice20],
        tablesToRoll.dice12.table[managerRelation.dice12],
        tablesToRoll.dice10.table[managerRelation.dice10],
        tablesToRoll.dice8.table[managerRelation.dice8]
    ];
}

function writeRoll () { // Arme / distance / armure / equipement dans cet ordre
    checkValue(elements.anciennete, 1, 10);
    checkValue(elements.mj, 0, 20);
    const finalArray = getEquipement();
    if (elements.extraItem) {
        finalArray.push(elements.extraItem);
    }
    const toWrite = [];
    for (const entry of finalArray) {
        if (Array.isArray(entry)) {
            for (const subEntry of entry) {
                const mapEntry = {
                    [TYPES.equipement]: () => `${subEntry.name} Δ${subEntry.dice}`,
                    [TYPES.item]: () => `${subEntry.name}`,
                  };
          
                  if (mapEntry[subEntry.type]) {
                    toWrite.push(mapEntry[subEntry.type]());
                  }
            }
            toWrite.push('');
        } else {
            const mapEntry = {
                [TYPES.armor]: () => `${entry.name} ${entry.dice ? `Δ${entry.dice}${entry.extra ?? ""}` : ''}\n`,
                [TYPES.rangeWeapon]: () => `${entry.name} d${entry.dice}\n`,
                [TYPES.rangeWeaponWithAmmo]: () => `${entry.name} d${entry.dice}${entry.extra} (${entry.ammo.name} Δ${entry.ammo.dice})\n`,
                [TYPES.weapon]: () => `${entry.name} d${entry.dice}${entry.hands === 3 ? `/d${entry.dice}*` : entry.hands === 2 ? `*` : ''}\n`,
                [TYPES.specialEquipement]: () => `${entry.name} Δ${entry.dice}\n`,
                [TYPES.specialItem]: () => `${entry.name}\n`
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

function checkValue (toCheck, min, max) {
    if (toCheck.value > max) {
        toCheck.value = max;
    } else if (toCheck.value < 1) {
        toCheck.value = min; // TODO: allow MJ to roll with 0
    }
}

function init () {
    getElements();

    reset();

    elements.run.onclick = writeRoll;
    elements.reset.onclick = reset;

    DICES.forEach((dice => {
        elements[dice].onchange = () => {
            initDices(dice);
        }})
    );
}


init();


// run npx live-server in folder to start