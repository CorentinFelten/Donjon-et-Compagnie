import {
    WEAPONS,
    ARMORS,
    DISTANCE_WEAPONS,
    EQUIPEMENT,
    TYPES
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

const INIT_DICES = {
    weapon: () => initDices('weapon'),
    range: () => initDices('range'),
    armor: () => initDices('armor'),
    equipement: () => initDices('equipement')
}

const DICES = [
    'weapon', 'range', 'armor', 'equipement'
]

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
    if (element.value !== null) {
        for (const key of Object.keys(DICE_VALUES)) {
            if (DICE_VALUES[key] === elementId) {
                DICE_VALUES[key] = null;
                disableEnableOption(elementId, key, false);
            }
        }
        DICE_VALUES[element.value] = elementId;
        disableEnableOption(elementId, element.value, true);
    }
    if (DICE_VALUES.null) {
        delete DICE_VALUES.null;
    }
}

function getTablesToRoll (dicesDetail) {
    return {
        dice20: {
            table: TABLE_DICTIONNARY[dicesDetail.dice20],
            length: TABLE_DICTIONNARY[dicesDetail.dice20].length
        },
        dice12: {
            table: TABLE_DICTIONNARY[dicesDetail.dice12],
            length: TABLE_DICTIONNARY[dicesDetail.dice12].length
        },
        dice10: {
            table: TABLE_DICTIONNARY[dicesDetail.dice10],
            length: TABLE_DICTIONNARY[dicesDetail.dice10].length
        },
        dice8: {
            table: TABLE_DICTIONNARY[dicesDetail.dice8],
            length: TABLE_DICTIONNARY[dicesDetail.dice8].length
        }
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
    const pageDices = DICE_VALUES;
    if (Object.values(pageDices).some(dice => dice === null)) {
        document.getElementById('tirage').innerText = 'Tous les dés ne sont pas attribués'
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

function writeRoll () { // Arme / distance / armure / equipement dans cet ordre
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

function checkValue (toCheck, max) {
    if (toCheck.value > max) {
        toCheck.value = max;
    } else if (toCheck.value < 1) {
        toCheck.value = 1;
    }
}

function init () {
    getElements();

    reset();

    elements.run.onclick = writeRoll;
    elements.reset.onclick = reset;

    DICES.forEach((dice => {
        elements[dice].onchange = INIT_DICES[dice];
    }));

    try {
        JSON.parse(elements.weapon.value);
    } catch (e) {
        INIT_DICES.weapon();
    }
    try {
        JSON.parse(elements.range.value);
    } catch (e) {
        INIT_DICES.range();
    }
    try {
        JSON.parse(elements.armor.value);
    } catch (e) {
        INIT_DICES.armor();
    }
    try {
        JSON.parse(elements.equipement.value);
    } catch (e) {
        INIT_DICES.equipement();
    }
}


init();


// run npx live-server in folder to start