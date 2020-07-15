const A = require('../demo/A');
const B = require('../demo/B');
const C = require('../demo/C');

exports.start = async ctx => {
    let handler = new A();
    handler.setNext(
        new B()
    ).setNext(
        new C()
    );

    handler.handle(ctx);
}