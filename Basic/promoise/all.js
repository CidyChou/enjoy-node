// Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
    return "/post/" + id + ".json";
});

Promise.all(promises).then(function (posts) {
    console.log(`posts${posts}`);
    console.log(posts);
}).catch(function (reason) {
    console.log(reason);
});