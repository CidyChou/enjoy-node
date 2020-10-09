const SchoolGirl = require("./SchoolGirl");
const Proxy = require("./Proxy");

let mm = new SchoolGirl();
mm.name = 'lx';

let proxy = new Proxy(mm);
proxy.GiveDolls(); // proxy 帮 Pursuit 送礼物;
proxy.GiveChocolate();