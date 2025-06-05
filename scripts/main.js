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
    this.health = 200;
    this.mana = 50;
    this.subclass = "Звичайний герой";
    this.baseAttack = 10;
    this.basePowerDamage = 25;
    this.manaCost = 30;
    this.manaRegeneration = 10;
  }

  takeDamage(damage) {
    this.health -= damage;
    console.log(
      `${this.subclass} отримав ${damage} шкоди. Залишилось ХП: ${this.health}`
    );
  }

  getPowerDamage() {
    this.mana -= this.manaCost;
    return this.basePowerDamage + RandomUtils.getRandomInt(-10, 10);
  }

  hit() {
    this.mana += this.manaRegeneration;
    if (this.mana > 150) this.mana = 150;
    console.log(`${this.subclass} наносить звичайну атаку!`);
    return this.baseAttack + RandomUtils.getRandomInt(-2, 5);
  }

  userPower(message = "Використовую вміння!") {
    if (this.mana < this.manaCost) {
      console.log(`${this.subclass} не вистачає мани для вміння!`);
      return false;
    }
    console.log(`${this.subclass}: ${message}`);
    return true;
  }

  showStats() {
    console.log(`${this.subclass} | ХП: ${this.health}, Мана: ${this.mana}`);
  }

  showInfoHero() {
    console.log(
      `Повна інформація про героя:\n\nГерой: ${this.subclass}, рівень ХП: ${this.health}, рівень мани: ${this.mana}\n\nСила удару: ${this.baseAttack} (модифікатор -2, +5)\nСила навика: ${this.basePowerDamage} (модифікатор 0, +10)\n\nРегенерація мани: ${this.manaRegeneration}\nВитрата мани на навик: ${this.manaCost}`
    );
  }
}

class Mage extends Hero {
  constructor() {
    super();
    this.mana += 50;
    this.health -= 25;
    this.manaCost = 50;
    this.manaRegeneration = 50;
    this.baseAttack = 10;
    this.basePowerDamage = 40;
  }
}

class FireMage extends Mage {
  constructor() {
    super();
    this.subclass = "Маг вогню";
    this.basePowerDamage = 50;
  }

  userPower() {
    return super.userPower("Кидаю - FIREBALL");
  }
}

class EarthMage extends Mage {
  constructor() {
    super();
    this.subclass = "Маг землі";
    this.basePowerDamage = 50;
  }

  userPower() {
    return super.userPower("ЗАКЛЯТТЯ - MOUNTAIN REBELLION");
  }
}

class IceMage extends Mage {
  constructor() {
    super();
    this.subclass = "Маг льоду";
    this.basePowerDamage = 50;
  }

  userPower() {
    return super.userPower("КИДАЮ - SNOWBALL");
  }
}

class Warlock extends Hero {
  constructor() {
    super();
    this.subclass = "Варлок";
    this.mana += 30;
    this.health -= 15;
    this.manaCost = 100;
    this.manaRegeneration = 35;
    this.baseAttack = 12;
    this.basePowerDamage = 60;
  }

  userPower() {
    return super.userPower("Прокляття з ТІНЕВОГО СВІТУ");
  }
}

class FightUtils {
  static balancer(firstHero, secondHero) {
    const balancerCoefficient = 20;
    console.log(
      `\n${firstHero.subclass} б'є першим, ${secondHero.subclass} отримує додатково ${balancerCoefficient}ХП`
    );
    secondHero.health += balancerCoefficient;
  }

  static fight(firstHero, secondHero) {
    console.log(
      `\nБій розпочався між ${firstHero.subclass} та ${secondHero.subclass}!`
    );

    this.balancer(firstHero, secondHero);

    while (firstHero.health > 0 && secondHero.health > 0) {
      if (this.heroTurn(firstHero, secondHero)) break;
      if (this.heroTurn(secondHero, firstHero)) break;
    }
  }

  static heroTurn(attacker, defender) {
    console.log(`\nХід ${attacker.subclass}:`);

    if (attacker.mana < attacker.manaCost) {
      const damage = attacker.hit();
      defender.takeDamage(damage);
    } else {
      if (attacker.userPower()) {
        const damage = attacker.getPowerDamage();
        defender.takeDamage(damage);
      } else {
        const damage = attacker.hit();
        defender.takeDamage(damage);
      }
    }

    attacker.showStats();
    defender.showStats();

    if (defender.health <= 0) {
      console.log(
        `\n${defender.subclass} переможений! ${attacker.subclass} переміг!`
      );
      return true;
    }

    return false;
  }
}

// ======= Використання =======
const fireMage = new FireMage();
const earthMage = new EarthMage();
const iceMage = new IceMage();
const warlock = new Warlock();

FightUtils.fight(warlock, fireMage);
