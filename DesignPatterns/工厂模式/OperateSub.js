const $ = require('underscore');

const Operate = require("./Operate");

class OperateSub extends Operate {
    constructor(...nums) {
        super(...nums);
    }

    getResult() {
        return $.reduce(this.nums, (meno, num) => {
            return meno - num;
        });
    }
}

module.exports = OperateSub;