let buf = new ArrayBuffer(4);


buf[0] = 1;
buf[1] =2 ;

// console.log(buf);


//  0x00112211
const a = 0x00112211;
// console.log(a);


function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) ==="undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex ="0" + hex;
    }

    return hex;
}

// (12,11,10,6,2)
// (C,B,A,6,2)
// 000CBA62
console.log(decimalToHex(2,8));



function stringToHex(str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {

        if (val == "")``
            val = str.charCodeAt(i).toString(16);
        else
            val += "," + str.charCodeAt(i).toString(16);
    }
    return val;
}

console.log(parseInt('ACEE',16))
