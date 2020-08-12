const A = require('../demo/A');
const B = require('../demo/B');
const C = require('../demo/C');

/**
 * 
 * @param {*} ctx 上下文
 * 
 *  责任链模式: 使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系。
 *  将这个对象的请求连成一条链，并沿着这条链传递该请求，直到有一个对象处理他为止。
 */


exports.start = async ctx => {
    let handler = new A();
    handler.setNext(
        new B()
    ).setNext(
        new C()
    );

    handler.handle(ctx);
}