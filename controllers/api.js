const _ = require('lodash');
const axios = require('axios');
const service = 'https://api.github.com';

module.exports.getList = async function(ctx, next){
  try {
    let res = await axios.get(service + '/repos/lcl-101/webpack-blog/issues?client_id=149613f6b828472ab126&client_secret=c003cfeeafa97ca0f4c756aab3c2051447ddaab7');
    console.log('response status: ' + res.status);
    console.log('response data: ' + JSON.stringify(res.data));
    if(res.status == 200 && res.data){
      resData = res.data;
    }else{
      resData.errType = 10010002;
      resData.message = '添加需求失败';
    }
  } catch (e) {
    resData.errType = 10010001;
    resData.message = '服务连接异常';
    console.log(e);
  }
  ctx.body = resData;
}
