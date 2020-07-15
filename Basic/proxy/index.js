let obj = {
    name: 'cidychou'
};

let objProxy = new Proxy(obj, {
    get(target, prop) {
        console.log(target, prop);
        return target[prop];
    }
});


objProxy.aaa;

console.log(objProxy.name);