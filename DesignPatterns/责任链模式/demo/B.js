const handler = require('../handler');

class B extends handler {
    constructor(getFunc) {
        super();
        
        this.getFunc = getFunc;
    }

    async handleFunc(ctx) {
        if (ctx.err)
            return;
        // TODO 验证参数

        console.log('bbbbb');

    }
}

module.exports = B;