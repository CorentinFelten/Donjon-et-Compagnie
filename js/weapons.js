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

class Item {
    /**
     * Constructor
     * @param {string} name 
     */
    constructor (name) {
        this.name = name;
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
    }
}

class Weapon extends Equipement {
    /**
     * 
     * @param {string} name 
     * @param {number} dice 
     * @param {string[]} extra 
     */
    constructor(name, dice, extra) {
        super(name, dice);
        this.extra = extra;
        this.hands;
        if (extra.includes(SPECIAL_WEAPON_ATTRIBUTES.singleAndTwoHanded)) {
            this.hands = [1, 2];
        } else if (extra.includes(SPECIAL_WEAPON_ATTRIBUTES.twoHandedOnly)) {
            this.hands = [2];
        } else {
            this.hands = [1];
        }
    }
}

class DistanceWeapon extends Equipement {
    /**
     * Constructor
     * @param {string} name 
     * @param {number} dice 
     * @param {string[]} extra
     */
    constructor (name, dice, extra) {
        super(name, dice);
        this.extra = extra;
    }
}

class DistanceWeaponWithAmmo extends DistanceWeapon {
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
    }
}

class Armor extends Equipement {
    /**
     * Constructor
     * @param {string} name 
     * @param {number} dice 
     */
    constructor (name, dice) {
        super(name, dice);
    }
}


export {
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
}