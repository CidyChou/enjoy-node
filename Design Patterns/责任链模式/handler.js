class handler {
    constructor(handleFunc) {
        if (handleFunc)
            this.handleFunc = handleFunc;
    }

    async handle(ctx) {
        try {
            await this.handleFunc(ctx);
        } catch (error) {
            ctx.err = error;
        } finally {
            if (this.next)
                await this.next.handle(ctx);
        }
    }

    setNext(next) {
        return (this.next = next);
    }
}

module.exports = handler;