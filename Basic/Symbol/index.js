// es6 原生数据类型 undefined null boolean string number object Symbol

console.log(typeof Symbol());

let a = {
    [Symbol('1')] :'hhh'
}

let b = {
    [Symbol('1')] :'aaa'
}

let target = {};
Object.assign(target, a, b); // Symbol的值是唯一的 所以复制的时候没有被覆盖。
console.log(target);

console.log(Object.getOwnPropertySymbols(target));


let array = [1,2,3,4];
console.log(array[Symbol.iterator]);
console.log(array[Symbol.iterator]());

let iter = array[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
