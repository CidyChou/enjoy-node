const OperationAdd = require("./OperationAdd");
const OperationSub = require("./OperationSub");

class CashContext {
    constructor(type) {
        switch (type) {
            case '+':
                this.CashSuper = new OperationAdd();
                break;
            case '-':
                this.CashSuper = new OperationSub();
        }
    }

    getResult(...num) {
        console.log(this.CashSuper);
        return this.CashSuper.doOperation(...num);
    }
}

module.exports = CashContext;