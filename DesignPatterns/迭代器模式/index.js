/**
 * 生成1-100, 
 * 
 * 返回 >30 , 并按 /3 分组
 * 
 * 
 * 
 * 
 */

let a = {};
for (i = 0; i < 100; i++) {
    if (i < 30) {
        a[i%3] = a[i%3] || [];
        a[i%3].push(i);
    }
}

console.log(a);


const $ = require('underscore');

const b = $.range(100);


console.log(b);