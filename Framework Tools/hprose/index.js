let hprose = require('hprose');

let server = hprose.Server.create("http://127.0.0.1:8080");

function hello(name) {
    return "Hello " + name + "!";
}

server.addFunction(hello);

server.start();