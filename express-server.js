
const WHITE_LIST = [
  "https://zjjkq.zhuji.gov.cn/zhyq-large-scrzeen-main/park.html", //视觉产业园大屏
  "https://zjjkq.zhuji.gov.cn/zhyq-large-screen-main/park.html#/situation", //园区态势
  "https://zjjkq.zhuji.gov.cn/zhyq-large-screen-main/park.html#/tenement", //园区物业
  "https://zjjkq.zhuji.gov.cn/zhyq-large-screen-main/park.html#/fireSafety", //园区安消
  "https://zjjkq.zhuji.gov.cn/zhyq-large-screen-main/park.html#/maintain", //园区运维
  "https://zjjkq.zhuji.gov.cn/zhyq-large-screen-main/park.html#/energy", //园区能耗
  "https://zjjkq.zhuji.gov.cn/zhyq-large-screen-main/park.html#/service", //服务成效


  // 测试用
  "http://www.baidu.com"
]
const express = require('express');
const cors = require('cors');
// 创建Express应用程序
const app = express();
app.use(cors());
// 使用express.static中间件，并传入一个目录路径和一个虚拟路径前缀
app.use('/test', express.static('test'));
// 定义路由
app.get('/route', (req, res) => {
  // const win = global.mainWindow
  const newPath = req.query.route
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  if (newPath) {
    // win.loadURL(newPath)
    res.json({
      code: 200,
      message: "路由成功"
    })
  } else {
    res.json({
      code: 400,
      message: "路由失败"
    })
  }
});




const server = app.listen(4000, '0.0.0.0', () => {
  const port = server.address().port;
  console.log(`服务器已启动，监听端口 ${port}`);
  
});
