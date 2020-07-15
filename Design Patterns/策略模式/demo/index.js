(async function () {
    const CashContext = require("./CashContext");
    let cashContext = new CashContext('+');
    console.log(cashContext.getResult(1, 1, 11));

    cashContext = new CashContext('-');
    console.log(cashContext.getResult(11, 1));
})()