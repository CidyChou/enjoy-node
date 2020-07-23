class DState {
    constructor() {

    }

    async enter(fsm) {
        fsm.end = false;
        console.log('im d');
    }

    // async transform(fsm) {
    //     await this.transformTo(fsm.end ? 'c-state' : 'd-state');
    // }
}

module.exports = DState;