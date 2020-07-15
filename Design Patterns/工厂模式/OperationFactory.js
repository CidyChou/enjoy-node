const OperateAdd = require("./OperateAdd");
const OperateSub = require("./OperateSub");

exports.createOperate = (operate, ...num) => {
    switch (operate) {
        case "+":
            return new OperateAdd(...num);
        case "-":
            return new OperateSub(...num);
        default:
            break;
    }
}