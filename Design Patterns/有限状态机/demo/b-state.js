class BState {
    constructor() {

    }

    async enter(fsm) {
        fsm.isEnd = false;
        console.log('im b');
    }

    async transform(fsm) {
        await this.transformTo(fsm.isEnd ? 'b-state' : 'c-state');
    }
}

module.exports = BState;