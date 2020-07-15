(async function () {

    function arrayTest(a, b, c, d) {
        return Array.prototype.slice.call(arguments, 0);
    }

    console.log(arrayTest('a', 'b', 'c', 'd'));

    let a = {
        b: 2,
        c: {
            d: 1
        }
    };

    let json = {}
    let c = Object.assign(json, a); // 浅拷贝

    a.c.d = 4;
    a.b = 11111;
    console.log(a);
    console.log(json);
    console.log('=======', c);

    json.c.d = 12;
    console.log(a);
    console.log(json);
    console.log('=======', c);
    
})()