const api = {};
const domain_url = window.isDev ? 'http://chuzb.cn/lease/' : "http://chuzb.cn/lease/";
export default api;

//发送验证码
api.callbackQueryHouseVillageHandler = function (ph) {
    return Vue.http.jsonp( domain_url + 'api/user/sms', {
        params: {
            ph: $.trim(me.$mobile.val())
        }
    }).then(api.codeVerify);
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