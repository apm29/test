const axios = require('axios');
const dayjs = require("dayjs")
const sessionId = generateUUID()
const sha256 = require('sha256')
// import sha256 from 'crypto-js/sha256'; 
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function semanticAnalyse(text, delay = 0) {
  const timestamp = new Date().getTime() + parseInt(delay)
  const appId = "admin_localAuth"
  const appkey = "b949f0394b1d49208197dbe73f83c697"
  const chatbotKey = "chatbot202303247551"

  const str = appId + timestamp + appkey;
  const sign = sha256(str);
  const paramsJson = {
    chatbotKey: chatbotKey,
    tenantId: appId,
    timestamp: timestamp,
    sign: sign,
  };
  const params = btoa(JSON.stringify(paramsJson));
  const data = JSON.stringify({
    "chatbotKey": chatbotKey,
    "uid": sessionId,
    "trackId": generateUUID(),
    "text": text,
    "tenantId": appId,
    "timestamp": timestamp,
    "sign": params
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://10.10.10.202:9091/qa-parse/api/v1/parse',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  const now = dayjs()
  return axios.request(config)
    .then((response) => {
      console.log(response.headers);
      console.log(JSON.stringify(response.data));

      const delay = dayjs.duration(now.diff(dayjs(response.headers.Date))).as("milliseconds")
      console.log("delay:",delay);
      return response
    })
    .catch((error) => {
      console.log(error);
      return error
    });
}

semanticAnalyse()
