const $ = require('underscore');

const Operate = require("./Operate");

class OperateAdd extends Operate {
    constructor(...nums) {
        super(...nums);
    }

    getResult() {
        return $.reduce(this.nums, (meno, num) => {
            return meno + num;
        });
    }
}

module.exports = OperateAdd;