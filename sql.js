const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');

// 读取本地JSON文件
fs.readFile('results.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // 将JSON字符串解析为JSON对象
  const items = JSON.parse(data);

  // 处理JSON对象
  // console.log(jsonObj);
  // 打开数据库连接
  let db = new sqlite3.Database('shang_db.sqlite');

  // 创建表格
  db.run(`CREATE TABLE IF NOT EXISTS t_shang_records (
  id INTEGER,
  user_id INTEGER,
  title TEXT,
  goodslist_id INTEGER,
  addtime TEXT,
  luck_no INTEGER,
  nickname TEXT,
  headimg TEXT,
  shang TEXT
)`);

  for (const item of items) {
    // 获取所有键名和键值
    const keys = Object.keys(item);
    const values = Object.values(item);
    const sql = `INSERT INTO t_shang_records (${keys.join(',')}) VALUES ('${values.join("','")}')`;
    // 插入数据
    db.run(sql, function (err) {
      if (err) {
        console.log(sql)
        return console.error(err.message);
      }
      console.log('Data inserted successfully');
    });
  }

  // 关闭数据库连接
  db.close();
});

