const asyncHooks = require('async_hooks');
const fs = require('fs');

const hook = asyncHooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        log('Init: ', `${type}(asyncId=${asyncId}, parentAsyncId: ${triggerAsyncId})`)
    },
    before(asyncId) {
        log('Before: ', asyncId)
    },
    after(asyncId) {
        log('After: ', asyncId)
    },
    destroy(asyncId) {
        log('Destory: ', asyncId);
    }
});
hook.enable();

console.log(1);

function log(...args) {
    fs.writeSync(1, args.join(' ') + '\n');
}