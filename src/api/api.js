import { Promise } from 'es6-promise'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

window.isDev = "?dev=test";
const api = {};
const domain_url = window.isDev ? 'http://chuzb.cn/lease/' : "http://chuzb.cn/lease/";
export default api;
//注册
api.callbackUserRegisterHandler = function(param){
  return Vue.http.jsonp( domain_url + 'api/api/user/register' + isDev, {
      params: {
          ph: param.ph,
          cd: param.cd,
          rl: param.rl,
          oi: openid,
          nn: nickname,
          hm: headimgurl,
          sex: sex
      },
      jsonpCallback: 'callbackUserRegisterHandler'
  }).then(api.codeVerify);
};
//发送验证码
api.callbackUserSmsHandler = function (ph) {
    return Vue.http.jsonp( domain_url + 'api/user/sms' + isDev, {
        params: {
            ph: ph
        },
        jsonpCallback: 'callbackUserSmsHandler'
    }).then(api.codeVerify);
};
//登录
api.callbackUserLoginHandler = function (param) {
    console.log('api', param);
    return Vue.http.jsonp( domain_url + 'api/user/login' + isDev, {
        params: {
            ph: param.ph,
            pd: param.pd,
            cd: param.cd,
        },
        jsonpCallback: 'callbackUserLoginHandler'
    }).then(api.codeVerify)
};
// 验证code
api.codeVerify = function(result){
    return new Promise(function(resolve, reject){
        if(result.data && result.data.code == 0){
            resolve(result);
        }else{
            reject('request code is not 0');
        }
    })
};