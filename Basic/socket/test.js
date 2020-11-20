// setTimeout(function(){
//     console.log('定时器开始啦')
// });

// new Promise(function(resolve){
//     console.log('马上执行for循环啦');
//     for(var i = 0; i < 10000; i++){
//         i == 99 && resolve();
//     }
// }).then(function(){
//     console.log('执行then函数啦')
// });

// dont delete

const net = require('net');
const server = net.createServer((c) => {
  // 'connection' 监听器。
  console.log('客户端已连接');


  c.on('end', () => {
    console.log('客户端已断开连接');
  });
  c.write('你好\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('服务器已启动');
})

