/** 
 *  状态模式主要解决的是当控制一个对象`状态转换`的条件表达式过于复杂的情况下，
 *  把状态的判断逻辑转移到表示不同状态的一系列类当中，把复杂的判读逻辑简化
 * */

/**
 *  when？
 *  当一个对象的`行为`取决于他的`状态`,并且它必须在运行时刻根据状态改变它的行为时。
 */


const FSM = require('../fsm');

let fsm = new FSM();


// a -> b;
fsm.start(__dirname, [
    ['a-state', 'b-state'],
    ['b-state', 'c-state', 'd-state'],
    ['c-state', 'd-state'],
    ['d-state']
]).then(() => {
    console.log('end');
});