/**
 *  Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程。
 *  
 *  @param {object} target 要拦截的目标对象
 *  @param {object} handler 定制拦截行为
 *  let proxy = new Proxy(target, handler);
 *  
 * 
*/

let target = {};
let handler = {
    get(target, prop) {
        return target[prop];
    },
    set(target, prop, value) {
        target[prop] = value;
    },
    deleteProperty: function (target, property) {
        return delete target[property];
    },
    // enumerate(obj) {
    //     return obj[Symbol.iterator]();
    // },
};

let proxy = new Proxy(target, handler);

// set
proxy.name = 'face';

console.log(proxy);
// get
let name = proxy.name;
console.log(name);

// delete
if (delete proxy.name) {
    console.log(`delete ${name} success`);
}
