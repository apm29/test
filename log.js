// accessModule: 协议转换
// systemCode: iot - manager
// systemName: 物联网
// systemType: 3
// time: 20231019165150
// userName: 杨月清
// zlbId: 70753ea8 - 8b76 - 4c93 - b060 - 3008db11043f
// sign: e32f3c843bbadb8eb0bdeb91e8cc1ebc
const dayjs = require("dayjs")
const md5 = require("md5-js")
const FormData = require('form-data');
const fetch = require('node-fetch');

const name = "杨月清"
const id = "1d1e140d-e008-4c53-bdc9-72b196a4f79b"
const systemCode = 'iot-manager'
const systemName = '物联网'
const systemType = '3'
const title = "协议转换"
const time = dayjs().format('YYYYMMDDHHmmss')
const params = {
  accessModule: title,  // 当前路由名称
  systemCode: systemCode,  // 当前项目Code    增加Web标识
  systemName: systemName, // 当前项目名称    增加Web标识
  systemType: systemType, // Web端默认3
  time: time, // 当前时间
  userName: name, // 当前用户脱敏后的后的用户名
  zlbId: id, // 当前用户uapId
  sign: md5(`${title}-${systemCode}-${systemName}-${systemType}-${name}-${id}-${time}`)  // md5加密验签 格式为 Md5(accessModule-systemCode-systemName-systemType-username-zlbId-time)
}
const formData = new FormData()
Object.keys(params).forEach(key => {
  formData.append(key, params[key])
})
console.log(params);
fetch("http://lgpark.iflysec.com/dl-manage/accessLog/saveAccessLog", {
  body: formData,
  method: "POST",
  mode: 'no-cors'
}).then(response => response.json())
  .then(data => {
    // 处理响应数据
    console.log(data);
  }).catch(err => {
    console.error(err);
  })
