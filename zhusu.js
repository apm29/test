var axios = require('axios');
var qs = require('qs');


function judge(page) {
  var data = qs.stringify({
    page: page,
    size: '100',
    orderBy:
      "addDate:asc,testProInnumId:asc,id:asc",
    productLevel_op:
      "ct",
    productNum_op:
      "ct",
    createTime_0:
      "2022-06-01 00:00:00",
    createTime_1:
      "2023-01-06 23:59:59",
    createTime_op:
      "bt"
  });
  var config = {
    method: 'post',
    url: 'http://atcc-workshop.autopaddle.com/java/testProZhusucs/selectAllMagic',
    headers: {
      'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)'
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      console.log(page, "分页数据");
      const judgeData = response.data.data.dataList.map(it => ({
        addDate: it.addDate,
        dictionaryCfXfId: it.dictionaryCfXfId,
        testProInnumId: it.testProInnumId,
      }))
      var judgeConfig = {
        method: 'post',
        url: 'http://atcc-workshop.autopaddle.com/java/testProZhusucs/judgePro',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': "application/json",
        },
        data: judgeData,
      };
      return axios(judgeConfig)
        .then(function (response) {
          console.log(page, "判定", response.data.text);
        })
        .catch(function (error) {
          console.log(page, "判定失败", response.data.text);
        });

    })
    .catch(function (error) {
      console.log(page, "分页请求失败");
    });

}

const arr = Array.from({ length: 9 }).map((it, index) => index + 1)

async function judgeBatch() {
  for (const page of arr) {
    await judge(page)
  }
}

judgeBatch()
