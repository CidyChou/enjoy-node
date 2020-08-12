(async function () {

    setInterval(() => {}, 1000);

    require('sleep').sleep(10);
    console.log('finsh');


    let set = new Set();

    set.add(123);
    set.add(12);
    set.add(111);

    console.log(set.values());


    console.log(set.values().next());


    let arr721 = [{
        a: 1
    }, {
        a: 2
    }];

    arr721.reduce(a => {
        console.log(a);
    })



    this.A = 12;
    this.a = 1;
    console.log(this.A);
    console.log(this.a);


    const path = require('path');
    console.log(__dirname);
    console.log(path.dirname(__dirname));
    console.log(process.cwd());

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


    let red = [1, 2, 3, 4, 5];


    red.reduce((meno, r) => {
        console.log(meno, '====', r);
        return r;
    });
})()