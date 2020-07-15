const Givegift = require('./Givegift');
const Pursuit = require('./Pursuit');

class Proxy extends Givegift {
    constructor(mm) {
        super();
        // MARK
        this.pursuit = new Pursuit(mm);
    }

    GiveDolls() {
        this.pursuit.GiveDolls();
    }

    GiveFlowers() {
        this.pursuit.GiveFlowers();
    }

    GiveChocolate() {
        this.pursuit.GiveChocolate();
    }

}

module.exports = Proxy;