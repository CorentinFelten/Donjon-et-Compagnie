const SPECIAL_WEAPON_ATTRIBUTES = {
    singleAndTwoHanded: "Arme maniable à une ou deux mains",
    twoHandedOnly: "Arme à deux mains",
    powder: "Arme à poudre",
    medieval: "Arme d'hast médiévale"
}

const UNIQUE_ITEMS_BONUSES = {
    mrBlackSword: "Avantage à tous les jets d'interaction avec les employés de Donjon & Cie",
    arnezonThread: "Oscille de manière étrange en présence d'un passage secret",
    drizeDurbanCompass: "Trois réglages: pointe vers le client, le résident, ou l'employé le plus proche",
    supervisionCristalBall: "Permet de voir toute personne ou lieu qu'on connaît déjà. Jet de SAG pour la contrôler, la plupart des huiles sentent lorsqu'ils sont observés",
    dragonTooth: "Permet de contrôler les reptiles inintelligents et de charmer les humanoïdes reptiliens. Jet de CHA pour s'en servir",
    lichFinger: "Tue la créature vers qui le doigt est pointé. La liche sait instantanément que son doigt a été 'retrouvé'",
    drakovitchCape: "Permet de se transformer en : {1-3}: rat / {4-5}: chauve-souris / {6}: forme gazeuse",
    affallelaNotebook: "Faveurs de la Mercatique, utilisables uniquement dans les aires clients",
    PaijiMasterKey: "Ouvre tous les coffres, portes, armoires et autres serrures du Donjon",
    emergencyWand: "Téléporte l'utilisateur au palier des huiles lorsque la baguette est brisée"
}

const TYPES = {
    item: 'item',
    specialItem: 'specialItem',
    equipement: 'equipement',
    specialEquipement: 'specialEquipement',
    weapon: 'weapon',
    rangeWeapon: 'rangeWeapon',
    rangeWeaponWithAmmo: 'rangeWeaponWithAmmo',
    armor: 'armor'
}

class Item {
    /**
     * Constructor
     * @param {string} name 
     */
    constructor (name) {
        this.name = name;
        this.type = TYPES.item;
    }
}

class SpecialItem extends Item {
    /**
     * Constructor
     * @param {string} name 
     * @param {string[]} attributes 
     */
    constructor (name, attributes) {
        super(name);
        this.attributes = attributes;
        this.type = TYPES.specialItem;
    }
}

class Equipement extends Item {
    /**
     * Constructor
     * @param {string} name 
     * @param {number} dice 
     */
    constructor (name, dice) {
        super(name);
        this.dice = dice;
        this.type = TYPES.equipement;
    }
}


class SpecialEquipement extends Equipement {
    /**
     * Constructor
     * @param {string} name 
     * @param {number} dice 
     * @param {string[]} extra 
     */
    constructor(name, dice, extra) {
        super(name, dice),
        this.extra = extra;
        this.type = TYPES.specialEquipement;
    }
}

class Weapon extends Equipement {
    /**
     * 
     * @param {string} name 
     * @param {number} dice 
     * @param {string[]} extra 
     */
    constructor(name, dice, extra = []) {
        super(name, dice);
        this.type = TYPES.weapon;
        this.extra = extra;
        this.hands;
        if (extra.includes(SPECIAL_WEAPON_ATTRIBUTES.singleAndTwoHanded)) {
            this.hands = 3;
        } else if (extra.includes(SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly)) {
            this.hands = 2;
        } else {
            this.hands = 1;
        }
    }
}

class RangeWeapon extends Equipement {
    /**
     * Constructor
     * @param {string} name 
     * @param {number} dice 
     * @param {string[]} extra
     */
    constructor (name, dice, extra) {
        super(name, dice);
        this.extra = extra;
        this.type = TYPES.rangeWeapon;
    }
}

class RangeWeaponWithAmmo extends RangeWeapon {
    /**
     * Constructor
     * @param {string} name 
     * @param {number} dice 
     * @param {string[]} extra 
     * @param {{name: string, dice: number}} ammo 
     */
     constructor (name, dice, extra, ammo) {
        super(name, dice, extra);
        this.ammo = ammo;
        this.type = TYPES.rangeWeaponWithAmmo;
    }
}

class Armor extends Equipement {
    /**
     * Constructor
     * @param {string} name 
     * @param {number} dice 
     * @param {string} extra
     */
    constructor (name, dice, extra) {
        super(name, dice);
        this.type = TYPES.armor;
        this.extra = extra;
    }
}

const WEAPONS = [
    new Weapon("Matraque", 4),
    new Weapon("Pertuisane", 6, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly, SPECIAL_WEAPON_ATTRIBUTES.medieval]),
    new Weapon("Dague", 4),
    new Weapon("Coutelas", 4),
    new Weapon("Épée courte", 6),
    new Weapon("Bâton clouté", 6),
    new Weapon("Fouet", 4),
    new Weapon("Lance", 6, [SPECIAL_WEAPON_ATTRIBUTES.singleAndTwoHanded]),
    new Weapon("Rapière", 6),
    new Weapon("Gourdin", 4),
    new Weapon("Hachette", 6),
    new Weapon("Guisarme", 8, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly, SPECIAL_WEAPON_ATTRIBUTES.medieval]),
    new Weapon("Faux", 6),
    new Weapon("Machette", 6),
    new Weapon("Fléau d'Armes", 8, [SPECIAL_WEAPON_ATTRIBUTES.singleAndTwoHanded]),
    new Weapon("Bardiche", 6, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly, SPECIAL_WEAPON_ATTRIBUTES.medieval]),
    new Weapon("Glaive", 6),
    new Weapon("Cimeterre", 8),
    new Weapon("Pique", 8, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly]),
    new Weapon("Washizaki", 6),
    new Weapon("Épée et Main Gauche", 8),
    new Weapon("Katana", 8),
    new Weapon("Massue Cloutée", 6),
    new Weapon("Hache de Guerre", 8),
    new Weapon("Marteau de Guerre", 10, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly]),
    new Weapon("Épée Bâtarde", 8, [SPECIAL_WEAPON_ATTRIBUTES.singleAndTwoHanded]),
    new Weapon("Masse d'Armes", 8, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly]),
    new Weapon("Hallebarde", 10, [SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly]),
    new Weapon("Masse de Guerre", 10)
]

const DISTANCE_WEAPONS = [
    new RangeWeaponWithAmmo("Pierres polies", 4, [], {name: "Sac", dice: 10}),
    new RangeWeaponWithAmmo("Poignard de jet", 4, [], {name: "Ceinture", dice: 6}),
    new RangeWeaponWithAmmo("Fronde", 4, [], {name: "Sac de caillous", dice: 10}),
    new RangeWeaponWithAmmo("Fléchettes", 4, [], {name: "Carquois", dice: 6}),
    new RangeWeapon("Arc Court", 6, []),
    new RangeWeapon("Bolas", 4, []),
    new RangeWeaponWithAmmo("Pistolet de duel", 6, ["§"], {name: "Poudre & Plomb", dice: 6}),
    new RangeWeapon("Javelot", 6, []),
    new RangeWeaponWithAmmo("Shuriken", 4, [], {name: "Étui", dice: 6}),
    new RangeWeaponWithAmmo("Arbalète à une main", 6, [], {name: "Carreaux", dice: 6}),
    new RangeWeaponWithAmmo("Haches de lancer", 6, [], {name: "Ceinture", dice: 6}),
    new RangeWeaponWithAmmo("Arc nomade", 6, [], {name: "Carquois", dice: 8}),
    new RangeWeaponWithAmmo("Couleuvrine", 8, ["§"], {name: "Poudre & Plomb", dice: 6}),
    new RangeWeapon("Shuriken lourd", 8, []),
    new RangeWeaponWithAmmo("Tromblon", 6, ["§"], {name: "Poudre & Grenaille", dice: 8}),
    new RangeWeapon("Lame-Boomerang", 8, []),
    new RangeWeaponWithAmmo("Arc de Chasse", 6, [], {name: "Carquois", dice: 8}),
    new RangeWeaponWithAmmo("Arbalette à Répétition", 8, [], {name: "Carreaux", dice: 8}),
    new RangeWeaponWithAmmo("Bâton-Fronde", 6, [], {name: "Sac de billes", dice: 8}),
    new RangeWeapon("Francisque", 8, []),
    new RangeWeapon("Framée", 8, []),
    new RangeWeaponWithAmmo("Fronde", 6, [], {name: "Sac de billes d'acier", dice: 6}),
    new RangeWeapon("Angon", 6, []),
    new RangeWeapon("Javeline", 8, []),
    new RangeWeaponWithAmmo("Lance Javelots", 8, [], {name: "Javelots", dice: 6}),
    new RangeWeaponWithAmmo("Grenades", 10, ["§"], {name: "Ceinture", dice: 4}),
    new RangeWeaponWithAmmo("Arbalète à répétition", 8, [], {name: "Carreaux", dice: 8}),
    new RangeWeaponWithAmmo("Arquebuse", 8, ["§"], {name: "Poudre & Plomb", dice: 6}),
    new RangeWeaponWithAmmo("Mousquet", 10, ["§"], {name: "Poudre & Plomb", dice: 6}),
]


const ARMORS = [
    new Armor("Cuir renforcé", 4, "+"), // d4+
    new Armor("Casque rouillé", 4, "+"),  // d4+
    new Armor("Harnois de cuir", 6),
    new Armor("Bouclier rond et manteau de cuir", 4),
    new Armor("Bouclier de bois", 0), // d0 ???
    new Armor("Cuir Bouilli", 6),
    new Armor("Cuirasse rouillée", 6),
    new Armor("Tunique de cuir et toque", 4, "+"), //d4+
    new Armor("Maille trouée", 6),
    new Armor("Cuir clouté", 6),
    new Armor("Cuirasse", 6),
    new Armor("Petit bouclier et cuir renforcé", 4, "+"), // d4+
    new Armor("Lorique mal ajustée", 6),
    new Armor("Cotte d'Anneaux", 8),
    new Armor("Tunique de Mailles", 8),
    new Armor("Haubert rouillé", 6),
    new Armor("Cuirasse", 8),
    new Armor("Cuir moisi et maille rouillée", 6),
    new Armor("Plaque Rouillée", 8),
    new Armor("Pavois et cuir & maille", 6),
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
    new SpecialEquipement("Vieux carnet de notes d'Affallela", 6, [UNIQUE_ITEMS_BONUSES.affallelaNotebook]),
    new SpecialEquipement("Ancienne Clef Universelle de Paiji", 8, [UNIQUE_ITEMS_BONUSES.paijiMasterKey]),
    new SpecialItem("Baguette d'urgence", [UNIQUE_ITEMS_BONUSES.emergencyWand])
]


export {
    Item,
    SpecialItem,
    Equipement,
    SpecialEquipement,
    Weapon,
    RangeWeapon,
    RangeWeaponWithAmmo,
    Armor,
    SPECIAL_WEAPON_ATTRIBUTES,
    UNIQUE_ITEMS_BONUSES,
    TYPES,
    WEAPONS,
    ARMORS,
    DISTANCE_WEAPONS,
    EQUIPEMENT,
    SPECIAL_EQUIPEMENT
}