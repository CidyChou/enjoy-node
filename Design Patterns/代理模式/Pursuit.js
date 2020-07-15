const Givegift = require("./Givegift");

class Pursuit extends Givegift {
    constructor(mm) {
        super();

        this.mm = mm;
    }

    GiveDolls() {
        console.log(`Give Dolls To ${this.mm.name} `);
    }

    GiveFlowers() {
        console.log(`Give Flowers To ${this.mm.name} `);
    }

    GiveChocolate() {
        console.log(`Give Chocolate To ${this.mm.name} `);
    }
}

module.exports = Pursuit;