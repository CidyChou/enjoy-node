const handler = require('../handler');

class A extends handler {
    constructor(getFunc) {
        super();

        this.getFunc = getFunc;
    }

    async handleFunc(ctx) {
        if (ctx.err)
            return;
        // TODO 验证参数

        // TODO Something
        console.log('aaaaa');

    }
}

module.exports = A;