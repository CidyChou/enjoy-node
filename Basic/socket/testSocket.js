const io = require('socket.io-client');

//var socket = io('ws://localhost:3000/');


var socket = io('ws://192.168.6.194:3000/');


socket.on('connect', function () {
  console.log("==============connection================");
});


socket.on('data', function (data) {
  console.log("receive data from server....", data);
});

socket.on('error', function (err) {
  console.log(err);
});

socket.on('close', function _close() {
  console.log('server close the connect');
});


let data = {
	uid: 2,
	pageNum: 2,
	pageSize: 3
};
socket.emit("getHistory", data);
