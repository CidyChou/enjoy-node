class CState {
    constructor() {

    }

    async enter(fsm) {
        fsm.end = false;
        console.log('im c');
    }

    // async transform(fsm) {
    //     await this.transformTo(fsm.end ? 'c-state' : 'd-state');
    // }
}

module.exports = CState;