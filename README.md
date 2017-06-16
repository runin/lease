# lease

> study

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

## 其中遇到一些坑
>1、一个Vue实例内使用$http， 跨域jsonp处理，修改回调函数名，必须指定参数jsonpCallback
``` bash
 this.$http.jsonp('http://chuzb.cn/lease/api/house/houseArea?dev=test', {
                    params:{
                        cn: '深圳市'
                    }, emulateJSON: true,
                    headers: {},
                    jsonpCallback: 'callbackQueryHouseVillageHandler'
                    }).then(function(result) {
                        console.log('22222')
                    // 这里是处理正确的回调
                }, function(response) {
                    // 这里是处理错误的回调
                    console.log(response)
                });
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).