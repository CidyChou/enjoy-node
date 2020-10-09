const operationFactory = require('./OperationFactory');

// +
let operateAdd = operationFactory.createOperate('+', 12, 2);
console.log(`加法计算的结果:${operateAdd.getResult()}`);

// - 
let operateSub = operationFactory.createOperate('-', 12, 2);
console.log(`减法计算的结果:${operateSub.getResult}`);