const Strategy = require("./Strategy");

class OperationSub extends Strategy {
    doOperation(...nums) {
        return nums.reduce((memo, num) => {
            return memo - num;
        });
    }
}

module.exports = OperationSub;