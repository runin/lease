//正式
var domain_url = "http://chuzb.cn/lease/";
var mpappid = 'wx08dd7c49b76f57ae';//出租宝appid

var share_img = "http://yaotv-test.oss-cn-shenzhen.aliyuncs.com/lottery/prize/images/2017125/86feef4c74ee4e8ca6a181b316d7cb19.png";
var share_title = "出租宝";
var share_desc = "出租宝-2017端午节快乐";
var share_url = window.location.href;

var shareData = {
    'imgUrl': share_img,
    'link': share_url,
    'desc': share_desc,
    'title': share_title
};

var wTitle = '出租宝';//title名称
var mapKey = 'UVZBZ-G7DRP-ML6DO-L5KLM-3XKRF-G3BOS';
//西安市
// var latitude = 34.215760; // 纬度，浮点数，范围为90 ~ -90
// var longitude = 108.878370;// 经度，浮点数，范围为90 ~ -90
//深圳市
var latitude = 22.543318; // 纬度，浮点数，范围为90 ~ -90
var longitude = 114.060402;// 经度，浮点数，范围为90 ~ -90
var cityCode = 440300;
var dev = '?dev=test';
var jumpUrl = location.protocol + '//' + location.host+'/lease/';
var referrer = null;
var locationFlag = false;// 定位成功标识
var isNavLoad = false;  // 首页新位置提示标识，当使用默认位置时进行搜索后再更新定位，不显示提示弹层