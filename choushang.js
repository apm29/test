const fs = require('fs');
const axios = require('axios');

const url = 'https://xinyiheshang.languowangluo.com/api/infinite_goods_shang_all';


async function getData(page) {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://xinyiheshang.languowangluo.com/api/infinite_goods_shang_all',
    headers: {
      'Host': 'xinyiheshang.languowangluo.com',
      'token': '198358ab6bd796f6b1f2eb6cbe995f3c',
      'content-type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.38(0x1800262b) NetType/WIFI Language/zh_CN',
      'Referer': 'https://servicewechat.com/wx5ae3e674724839f0/4/page-frame.html'
    },
    data : { goods_id:100051 , page:page }
  };

  try {
    //const response = await axios.post(`${url}`,{goods_id:100051 ,page:page});
    const response = await axios.request(config)
      /*  .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });*/
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function writeToFile(file, data) {
  try {
    for (const item of data.data.list) {
      await fs.promises.appendFile(file, JSON.stringify(item) + ',\n');
    }
    console.log(`Page ${data.data.list[0].user_id}: ${data.data.list.length} items written to ${file}`);
  } catch (error) {
    console.error(error);
  }
  
}

async function main() {
  const file = 'results.json';
  const pages = 1578;
  await fs.promises.appendFile(file, "[" + '\n');
  for (let i = 1; i <= pages; i++) {
    const data = await getData(i);
    await writeToFile(file, data);
  }
  await fs.promises.appendFile(file, "]" + '\n');
  console.log(`All pages written to ${file}`);
}





main();
