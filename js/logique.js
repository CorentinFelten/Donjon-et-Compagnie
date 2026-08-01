import {
    WEAPONS, ARMORS, DISTANCE_WEAPONS, EQUIPEMENT,
    TYPES, SPECIAL_EQUIPEMENT, Equipement
} from "./weapons.js";

const TABLE_MAP = {
    weapon: WEAPONS,
    range: DISTANCE_WEAPONS,
    armor: ARMORS,
    equipement: EQUIPEMENT
};

const CATEGORY_LABELS = {
    weapon: 'Arme au corps à corps',
    range: 'Arme à distance',
    armor: 'Armure',
    equipement: 'Nourriture & Équipement'
};

const DICE_ORDER = ['dice20', 'dice12', 'dice10', 'dice8'];
const CATEGORIES = ['weapon', 'range', 'armor', 'equipement'];

const diceAssignment = { dice20: null, dice12: null, dice10: null, dice8: null };

let elements = {};
let extraItem = null;

function randomNumber(min, max) {
    return min + crypto.getRandomValues(new Uint32Array(1))[0] % (max - min + 1);
}

function generateRolls() {
    return {
        dice20: randomNumber(2, 20),
        dice12: randomNumber(2, 12),
        dice10: randomNumber(2, 10),
        dice8: randomNumber(2, 8)
    };
}

function setOptionDisabled(excludeCategory, dieValue, disabled) {
    if (dieValue === "null") return;
    CATEGORIES.filter(id => id !== excludeCategory).forEach(id => {
        [...document.getElementById(id).options].forEach(opt => {
            if (opt.value === dieValue) opt.disabled = disabled;
        });
    });
}

function onDiceChange(categoryId) {
    const value = document.getElementById(categoryId).value;

    const previousDie = Object.keys(diceAssignment).find(k => diceAssignment[k] === categoryId);
    if (previousDie) {
        diceAssignment[previousDie] = null;
        setOptionDisabled(categoryId, previousDie, false);
    }

    if (value !== "null") {
        diceAssignment[value] = categoryId;
        setOptionDisabled(categoryId, value, true);
    }
}

function clampInput(input, min, max) {
    const val = Number(input.value);
    if (val > max) input.value = max;
    else if (val < min) input.value = min;
}

function getManagerModifiers(experience, tables) {
    const relation = elements.econome.value;
    const roll1 = generateRolls();

    const applyExperience = (rolls) => {
        const result = {};
        DICE_ORDER.forEach(die => {
            result[die] = Math.min(rolls[die] + experience, tables[die].length - 1);
        });
        return result;
    };

    if (relation === 'neutre') return applyExperience(roll1);

    const roll2 = generateRolls();
    const pick = relation === 'positive' ? Math.max : Math.min;
    const combined = {};
    DICE_ORDER.forEach(die => {
        combined[die] = pick(roll1[die], roll2[die]);
    });
    return applyExperience(combined);
}

function rollEquipment() {
    if (Object.values(diceAssignment).some(v => v === null)) return null;

    const tables = {};
    DICE_ORDER.forEach(die => {
        tables[die] = TABLE_MAP[diceAssignment[die]];
    });

    const indices = getManagerModifiers(Number(elements.anciennete.value), tables);

    if (indices.dice20 === Number(elements.mj.value)) {
        extraItem = SPECIAL_EQUIPEMENT[randomNumber(0, SPECIAL_EQUIPEMENT.length - 1)];
    } else {
        extraItem = null;
    }

    const results = {};
    DICE_ORDER.forEach(die => {
        results[diceAssignment[die]] = tables[die][indices[die]];
    });
    return results;
}

function formatItem(item) {
    const formatters = {
        [TYPES.weapon]: () => `${item.name} d${item.dice}${item.hands === 3 ? `/d${item.dice}*` : item.hands === 2 ? '*' : ''}`,
        [TYPES.rangeWeapon]: () => `${item.name} d${item.dice}`,
        [TYPES.rangeWeaponWithAmmo]: () => `${item.name} d${item.dice}${item.extra} (${item.ammo.name} Δ${item.ammo.dice})`,
        [TYPES.armor]: () => `${item.name}${item.dice ? ` Δ${item.dice}${item.extra ?? ''}` : ''}`,
        [TYPES.equipement]: () => `${item.name} Δ${item.dice}`,
        [TYPES.item]: () => item.name,
        [TYPES.specialEquipement]: () => `${item.name} Δ${item.dice}`,
        [TYPES.specialItem]: () => item.name
    };
    return formatters[item.type]?.() ?? item.name;
}

function el(tag, className, text) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text) e.textContent = text;
    return e;
}

function renderCategory(label, items, special) {
    const section = el('div', special ? 'result-category special' : 'result-category');
    section.appendChild(el('h3', null, label));
    (Array.isArray(items) ? items : [items]).forEach(item => {
        section.appendChild(el('p', 'item', formatItem(item)));
    });
    return section;
}

function renderResults(results) {
    const container = elements.result;
    container.innerHTML = '';

    CATEGORIES.forEach(category => {
        if (results[category]) {
            container.appendChild(renderCategory(CATEGORY_LABELS[category], results[category]));
        }
    });

    if (extraItem) {
        container.appendChild(renderCategory('Objet Spécial', extraItem, true));
    }

    const defaults = [new Equipement('Potion de Soins', 6), new Equipement('Torches', 4)];
    container.appendChild(renderCategory('Équipement de base', defaults));
}

function writeRoll() {
    clampInput(elements.anciennete, 1, 10);
    clampInput(elements.mj, 0, 20);

    const results = rollEquipment();
    if (!results) {
        elements.result.innerHTML = '<p class="error">Tous les dés ne sont pas attribués</p>';
        return;
    }
    renderResults(results);
}

function reset() {
    elements.result.innerHTML = '';
    elements.anciennete.value = 1;
    elements.mj.value = '';
    elements.econome.value = 'neutre';

    CATEGORIES.forEach(id => {
        elements[id].value = 'null';
        DICE_ORDER.forEach(die => setOptionDisabled(id, die, false));
    });
    DICE_ORDER.forEach(die => { diceAssignment[die] = null; });
    extraItem = null;
}

function init() {
    elements = {
        anciennete: document.getElementById('anciennete'),
        mj: document.getElementById('mj'),
        result: document.getElementById('result'),
        weapon: document.getElementById('weapon'),
        range: document.getElementById('range'),
        armor: document.getElementById('armor'),
        equipement: document.getElementById('equipement'),
        econome: document.getElementById('econome'),
        run: document.getElementById('run'),
        reset: document.getElementById('reset')
    };

    reset();
    elements.run.onclick = writeRoll;
    elements.reset.onclick = reset;
    CATEGORIES.forEach(id => {
        elements[id].onchange = () => onDiceChange(id);
    });
}

init();
