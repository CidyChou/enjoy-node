const A = require('../demo/A');
const B = require('../demo/B');
const C = require('../demo/C');

/**
 * 
 * @param {*} ctx 上下文
 * 
 *  责任链模式: 使多个对象都有机会处理请求，从而避免
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