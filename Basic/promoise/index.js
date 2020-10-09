// Promise 是异步编程的一种解决方案。
// 所谓Promise, 简单说它是一个容器,里面保存着未来才会结束的事件的结果.从语法上说，Promise是一个对象，从它可以获取异步操作的消息。

let promise = new Promise(function (resolve, reject) {
    if (true) {
        resolve();
    } else {
        reject(2);
    }
});


promise.then((value) => {
    console.log(value);
})