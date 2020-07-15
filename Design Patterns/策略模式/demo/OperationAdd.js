const Strategy = require("./Strategy");

class OperationAdd extends Strategy {
    doOperation(...nums) {
        return nums.reduce((memo, num) => {
            return memo + num;
        });
    }
}

module.exports = OperationAdd;