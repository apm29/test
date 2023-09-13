const WebSocket = require("ws")
const server = new WebSocket.Server({ port: 8080 });
var wav = require('wav');

// 监听连接事件
server.on('connection', (socket) => {
  console.log('Client connected');

  // 监听消息事件
  socket.on('message', (message) => {
    /// 创建一个可写流，用于写入音频文件
    const fileWriter = new wav.FileWriter('audio.wav', {
      sampleRate: 16000, // 码率为16k
      channels: 1, // 单声道
      bitDepth: 16 // 16位深度
    });
    // 将Buffer对象写入音频文件
    fileWriter.write(message);

    // 关闭文件写入器
    fileWriter.end(() => {
      console.log('音频文件已保存为audio.wav');
      socket.send('音频文件已保存为audio.wav');
    });

  });

  // 监听连接关闭事件
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
