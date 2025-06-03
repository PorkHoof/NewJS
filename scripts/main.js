class RandomUtils {
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getRandomFloat(min, max, decimals = 2) {
    const num = Math.random() * (max - min) + min;
    return parseFloat(num.toFixed(decimals));
  }

  static shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

class Hero {
  constructor() {
    this.health = 100;
    this.mana = 50;
    this.element = "Звичайний герой";
  }

  userEscape(min, max, factor) {
    if (RandomUtils.getRandomInt(min, max) > factor) {
      console.log("Ви втекли");
    } else {
      console.log("Ви намагались втекти але вас вбило");
    }
  }

  userHit(hit) {
    if (this.mana > 150) {
      console.log("Максимальне значення мани");
      return;
    }
    this.mana += this.manaRegeneration;
    console.log(hit);
  }

  userPower(skill) {
    if (this.mana < this.manaCost) {
      console.log("Недостатньо мани");
      return;
    }
    this.mana -= this.manaCost;
    console.log(skill);
  }

  showStats() {
    console.log(
      `Герой: ${this.element}, рівень ХП: ${this.health}, рівень мани: ${this.mana}`
    );
  }
}

class Mage extends Hero {
  constructor() {
    super();
    this.element = "";
    this.mana += 50;
    this.health -= 25;
    this.manaCost = 50;
    this.manaRegeneration = 50;
  }

  userPower(skill = "Магічна атака") {
    super.userPower(skill);
  }

  userHit() {
    super.userHit("Удар палицею (мана поповненна на 50)");
  }

  userEscape() {
    super.userEscape(1, 10, 7);
  }
}

// герои
class FireMage extends Mage {
  constructor() {
    super();
    this.element = "Маг вогню";
  }

  userPower() {
    super.userPower("Кидаю - FIREBALL");
  }
}

class EarthMage extends Mage {
  constructor() {
    super();
    this.element = "Маг землі";
  }

  userPower() {
    super.userPower("ЗАКЛЯТТЯ - MOUNTAIN REBELLION");
  }
}

class IceMage extends Mage {
  constructor() {
    super();
    this.element = "Маг льоду";
  }

  userPower() {
    super.userPower("КИДАЮ - SNOWBALL");
  }
}

class Warlock extends Hero {
  constructor() {
    super();
    this.element = "Warlok";
    this.mana += 30;
    this.health -= 15;
    this.manaCost = 100;
    this.manaRegeneration = 35;
  }

  userPower(skill = "закляття - curse of flesh rot") {
    super.userPower(skill);
  }

  userHit() {
    super.userHit("Удар палицею (мана поповненна на 35)");
  }

  userEscape() {
    super.userEscape(1, 10, 5);
  }
}

const fireMage = new FireMage();
const earthMage = new EarthMage();
const iceMage = new IceMage();
const warlock = new Warlock();

warlock.showStats();
warlock.userPower();
warlock.showStats();
warlock.userHit();
warlock.showStats();
warlock.userPower();
