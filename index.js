var axios = require('axios');
var qs = require('qs');


function judge(page) {
  var data = qs.stringify({
    page: page,
    size: '100',
    inNum_op:
      "ct",
    createTime_0:
      "2022-06-01 00:00:00",
    createTime_1:
      "2023-01-05 23:59:59",
    createTime_op:
      "bt",
    orderBy:
      "inDate:asc,testMetInnumId:asc,id:asc"
  });
  var config = {
    method: 'post',
    url: 'http://atcc-workshop.autopaddle.com/java/testMetLineFe2o3/selectAllMagic',
    headers: {
      'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)'
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      console.log(page, "分页数据");
      const list = response.data.data.dataList.map(it => it.testMetInnumId)
      var judgeConfig = {
        method: 'post',
        url: 'http://atcc-workshop.autopaddle.com/java/testMetLineFe2o3/judgeMet',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': "application/x-www-form-urlencoded",
        },
        data: {
          testMetInnumIds: list
        },
        transformRequest: [
          function (data, headers) {
            // 对发送的 data 进行任意转换处理
            return qs.stringify(data, { arrayFormat: "repeat" });
          },
        ],
      };
      return axios(judgeConfig)
        .then(function (response) {
          console.log(page, "判定", response.data.text);
        })
        .catch(function (error) {
          console.log(page, "判定失败");
        });

    })
    .catch(function (error) {
      console.log(page, "分页请求失败");
    });

}

const arr = Array.from({ length: 72 }).map((it, index) => index + 1)

async function judgeBatch() {
  for (const page of arr) {
    await judge(page)
  }
}

judgeBatch()
