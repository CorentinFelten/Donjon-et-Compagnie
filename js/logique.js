import {
    Item,
    SpecialItem,
    Equipement,
    SpecialEquipement,
    Weapon, 
    DistanceWeapon,
    DistanceWeaponWithAmmo,
    Armor,
    SPECIAL_WEAPON_ATTRIBUTES,
    UNIQUE_ITEMS_BONUSES
 } from "./weapons.js";



const WEAPONS = [
    new Weapon("Matraque", 4, []),
    new Weapon("Pertuisane", 6, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly, SPECIAL_WEAPON_ATTRIBUTES.medieval]),
    new Weapon("Dague", 4, []),
    new Weapon("Coutelas", 4, []),
    new Weapon("Épée courte", 6, []),
    new Weapon("Bâton clouté", 6, []),
    new Weapon("Fouet", 4, []),
    new Weapon("Lance", 6, [SPECIAL_WEAPON_ATTRIBUTES.singleAndTwoHanded]),
    new Weapon("Rapière", 6, []),
    new Weapon("Gourdin", 4, []),
    new Weapon("Hachette", 6, []),
    new Weapon("Guisarme", 8, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly, SPECIAL_WEAPON_ATTRIBUTES.medieval]),
    new Weapon("Faux", 6, []),
    new Weapon("Fléau d'Armes", 8, [SPECIAL_WEAPON_ATTRIBUTES.singleAndTwoHanded]),
    new Weapon("Bardiche", 6, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly, SPECIAL_WEAPON_ATTRIBUTES.medieval]),
    new Weapon("Glaive", 6, []),
    new Weapon("Cimeterre", 8, []),
    new Weapon("Pique", 8, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly]),
    new Weapon("Washizaki", 6, []),
    new Weapon("Épée et Main Gauche", 8, []),
    new Weapon("Katana", 8, []),
    new Weapon("Massue Cloutée", 6, []),
    new Weapon("Hache de Guerre", 8, []),
    new Weapon("Marteau de Guerre", 10, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly]),
    new Weapon("Épée Bâtarde", 8, [SPECIAL_WEAPON_ATTRIBUTES.singleAndTwoHanded]),
    new Weapon("Masse d'Armes", 8, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly]),
    new Weapon("Hallebarde", 10, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly]),
    new Weapon("Masse de Guerre", 10, [])
]

const DISTANCE_WEAPONS = [
    new DistanceWeaponWithAmmo("Pierres polies", 4, [], {name: "Sac", dice: 10}),
    new DistanceWeaponWithAmmo("Poignard de jet", 4, [], {name: "Ceinture", dice: 6}),
    new DistanceWeaponWithAmmo("Fronde", 4, [], {name: "Sac de caillous", dice: 10}),
    new DistanceWeaponWithAmmo("Fléchettes", 4, [], {name: "Carquois", dice: 6}),
    new DistanceWeapon("Arc Court", 6, []),
    new DistanceWeapon("Bolas", 4, []),
    new DistanceWeaponWithAmmo("Pistolet de duel", 6, [], {name: "Poudre & Plomb", dice: 6}),
    new DistanceWeapon("Javelot", 6, []),
    new DistanceWeaponWithAmmo("Shuriken", 4, [], {name: "Étui", dice: 6}),
    new DistanceWeaponWithAmmo("Arbalète à une main", 6, [], {name: "Carreaux", dice: 6}),
    new DistanceWeaponWithAmmo("Haches de lancer", 6, [], {name: "Ceinture", dice: 6}),
    new DistanceWeaponWithAmmo("Arc nomade", 6, [], {name: "Carquois", dice: 8}),
    new DistanceWeaponWithAmmo("Couleuvrine", 8, [], {name: "Poudre & Plomb", dice: 6}),
    new DistanceWeapon("Shuriken lourd", 8, []),
    new DistanceWeaponWithAmmo("Tromblon", 6, [SPECIAL_WEAPON_ATTRIBUTES.powder], {name: "Poudre & Grenaille", dice: 8}),
    new DistanceWeapon("Lame-Boomerang", 8, []),
    new DistanceWeaponWithAmmo("Arc de Chasse", 6, [], {name: "Carquois", dice: 8}),
    new DistanceWeaponWithAmmo("Arbalette à Répétition", 8, [], {name: "Carreaux", dice: 8}),
    new DistanceWeaponWithAmmo("Bâton-Fronde", 6, [], {name: "Sac de billes", dice: 8}),
    new DistanceWeapon("Francisque", 8, []),
    new DistanceWeapon("Framée", 8, []),
    new DistanceWeaponWithAmmo("Fronde", 6, [], {name: "Sac de billes d'acier", dice: 6}),
    new DistanceWeapon("Angon", 6, []),
    new DistanceWeapon("Javeline", 8, []),
    new DistanceWeaponWithAmmo("Lance Javelots", 8, [], {name: "Javelots", dice: 6}),
    new DistanceWeaponWithAmmo("Grenades", 10, [SPECIAL_WEAPON_ATTRIBUTES.powder], {name: "Ceinture", dice: 4}),
    new DistanceWeaponWithAmmo("Arbalète à répétition", 8, [], {name: "Carreaux", dice: 8}),
    new DistanceWeaponWithAmmo("Arquebuse", 8, [], {name: "Poudre & Plomb", dice: 6}),
    new DistanceWeaponWithAmmo("Mousquet", 10, [], {name: "Poudre & Plomb", dice: 6}),
]


const ARMORS = [
    new Armor("Cuir renforcé", 4), // d4+
    new Armor("Casque rouillé", 4),  // d4+
    new Armor("Harnois de cuir", 6),
    new Armor("Manteau de cuir et bouclier rond", 4),
    new Armor("Bouclier de bois", 0),
    new Armor("Cuir Bouilli", 6),
    new Armor("Cuirasse rouillée", 6),
    new Armor("Tunique de cuir et toque", 4), //d4+
    new Armor("Maille trouée", 6),
    new Armor("Cuir clouté", 6),
    new Armor("Cuirasse", 6),
    new Armor("Cuir renforcé et petit bouclier", 4), // d4+
    new Armor("Lorique mal ajustée", 6),
    new Armor("Cotte d'Anneaux", 8),
    new Armor("Tunique de Mailles", 8),
    new Armor("Haubert rouillé", 6),
    new Armor("Cuirasse", 8),
    new Armor("Cuir moisi et maille rouillée", 6),
    new Armor("Plaque Rouillée", 8),
    new Armor("Vuir & maille et pavois", 6),
    new Armor("Broigne", 6),
    new Armor("Gambison", 6),
    new Armor("Cuirasse Damasquinée", 8),
    new Armor("Brigandine", 8),
    new Armor("Haubert", 8),
    new Armor("Harnois et bouclier", 8),
    new Armor("Cuirasse, maille et coiffe", 10),
    new Armor("Plaque ouvragée", 10),
    new Armor("Plaque complète et écu", 10)
]

const EQUIPEMENT = [
    [
        new Equipement("Navets bouillis", 6)
    ],
    [
        new Equipement("Champignons et biscuits secs", 6)
    ],
    [
        new Equipement("Fricassée de champignons", 6)
    ],
    [
        new Equipement("Tripes en gelée", 6)
    ],
    [
        new Equipement("Chats fraîchement tués", 6)
    ],
    [
        new Equipement("Navets crus et pâté de rat", 6)
    ],
    [
        new Equipement("Jarre de soupe d'escargots", 6)
    ],
    [
        new Equipement("Pains de navet séché", 4),
        new Item("Chien de berger"),
        new Item("Sac à dos"),
        new Equipement("Tente", 10)
    ],
    [
        new Equipement("Viande séchée aux champignons", 4),
        new Item("Sac de couchage"),
        new Item("Ustensiles de cuisine"),
        new Item("Cartes de tarot")
    ],
    [
        new Equipement("Aubergines et poisson séché", 4),
        new Item("Filet"),
        new Item("Menottes")
    ],
    [
        new Equipement("Boulettes de limon frit au riz", 6)
    ],
    [
        new Equipement("Agneau confit et aubergines marinées", 6)
    ],
    [
        new Equipement("Pain frais et fruits", 6)
    ],
    [
        new Equipement("Rat vivant dans une cage", 6)
    ],
    [
        new Equipement("Saucisse au foie", 6),
        new Item("Sac à dos"),
        new Item("Couverture"),
        new Equipement("Corde", 10),
        new Item("Chapeau de pèlerin")
    ],
    [
        new Equipement("Mouton et fayots", 6),
        new Equipement("Eau bénite", 6),
        new Equipement("Outils d'alchimie", 8),
        new Equipement("Chandelles", 4)
    ],
    [
        new Equipement("Pommes flétries", 6),
        new Item("Collets"), 
        new Item("Sac de toile"),
        new Item("Dés")
    ],
    [
        new Equipement("Galette et poisson séché", 8)
    ],
    [
        new Equipement("Terrine de sanglier et bière", 8)
    ],
    [
        new Equipement("Conflit de canard au chou", 8)
    ],
    [
        new Equipement("Tourtes à l'oie épicées", 6),
        new Item("Vieux tapis ourlé"),
        new Item("Sac (x2)"),
        new Item("Barre à mine")
    ],
    [
        new Equipement("Gateaux de poisson et vin sec", 6),
        new Item("Sac de couchage"),
        new Item("Piège à ours (x2)")
    ],
    [
        new Equipement("Boulettes de riz au gingembre", 6),
        new Item("Sac de charbon"),
        new Item("Canne à pêche"),
        new Item("Cartes à jouer")
    ],
    [
        new Equipement("Tomates et jambon sec", 6),
        new Equipement("Lampe à huile", 4),
        new Item("Pelle"),
        new Item("Échelle de corde")
    ],
    [
        new Equipement("Tourtes au foie", 6),
        new Equipement("Trousse de courtisan", 8),
        new Item("Cape de qualité"),
        new Item("Rossignol en cage")
    ],
    [
        new Equipement("Boudin au sang et vin aigre", 6),
        new Item("Outils de crochetage"),
        new Item("Sac à dos"),
        new Equipement("Lanterne & huile", 8)
    ],
    [
        new Equipement("Gâteaux au citron et miel", 6),
        new Item("Habit de voyage de qualité"),
        new Item("Besace"),
        new Equipement("Cierges", 8)
    ],
    [
        new Equipement("Animelles en sauce", 8),
        new Equipement("Outils de tannerie", 6),
        new Item("Chapeau de magicien"),
        new Item("Longue-vue")
    ],
    [
        new Equipement("Fromage poivré et cidre", 6),
        new Equipement("Outils de cartographie", 8)
    ]
]


const SPECIAL_EQUIPEMENT = [
    new Weapon("Épée de Monsieur Noir", 6, [UNIQUE_ITEMS_BONUSES.mrBlackSword]),
    new SpecialItem("Fil à plomb d'Arnezon", [UNIQUE_ITEMS_BONUSES.arnezonThread]),
    new SpecialItem("Boussole de Drize Durban", [UNIQUE_ITEMS_BONUSES.drizeDurbanCompass]),
    new SpecialItem("Boule de cristal de la supervision", [UNIQUE_ITEMS_BONUSES.supervisionCristalBall]),
    new SpecialItem("Dent du Dragon Leogradonardicus III", [UNIQUE_ITEMS_BONUSES.dragonTooth]),
    new SpecialEquipement("Doigt d'Aarcarcerax", 4, [UNIQUE_ITEMS_BONUSES.lichFinger]),
    new SpecialEquipement("Cape de Vlad von Drakovitch", 6, [UNIQUE_ITEMS_BONUSES.drakovitchCape]),
    new SpecialEquipement("Vieux carnet de notes d'Affallela (directeur de la Mercatique)", 6, [UNIQUE_ITEMS_BONUSES.affallelaNotebook]),
    new SpecialEquipement("Ancienne Clef Universelle de Paiji (directeur de la Maintenance)", 8, [UNIQUE_ITEMS_BONUSES.paijiMasterKey]),
    new SpecialItem("Baguette d'urgence", [UNIQUE_ITEMS_BONUSES.emergencyWand])
]


const TABLE_DICTIONNARY = {
    "weapon": WEAPONS,
    "range": DISTANCE_WEAPONS,
    "armor": ARMORS,
    "equipement": EQUIPEMENT
}

/**
 * Initializes dices from web page
 * @returns {Object}
 */
function initDices () {
    return {
        dice20: "weapon",
        dice12: "range",
        dice10: "armor",
        dice8: "equipement"
    }
}

function getExperience () {
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
}

/**
 * Takes initialized dice detail to output the corresponding tables
 * @param {Object} dicesDetail 
 * @returns {Object}
 */
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

function main() {
    const pageDices = initDices();
    const tablesToRoll = getTablesToRoll(pageDices);
    console.log(Object.entries(tablesToRoll));
    const experience = getExperience();
    // console.log('Experience: ', experience);
    const randomNumbers = generateFourRandomNumbers();
    // console.log(randomNumbers);
    return [
        tablesToRoll.dice20.table[Math.max(randomNumbers.dice20 + experience, tablesToRoll.dice20.length)],
        tablesToRoll.dice12.table[Math.max(randomNumbers.dice12 + experience, tablesToRoll.dice12.length)],
        tablesToRoll.dice10.table[Math.max(randomNumbers.dice10 + experience, tablesToRoll.dice10.length)],
        tablesToRoll.dice8.table[Math.max(randomNumbers.dice8 + experience, tablesToRoll.dice8.length)]
    ]
}

console.log(main());
