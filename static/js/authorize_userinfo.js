; (function (w) {
    w.openid = "123";//$.fn.cookie(mpappid + '_openid');
    w.headimgurl = "123";//$.fn.cookie(mpappid + '_headimgurl');
    w.nickname = "123";//$.fn.cookie(mpappid + '_nickname');
    w.sex = $.fn.cookie(mpappid + '_sex');
    w.expires_in = { expires: 30 };
    w.Authorize = function (o) {
        this.mpappid =o && o.mpappid || mpappid;//mpappid
        this.callBackPage = o && o.callBackPage||"";//授权之后的回调页面
        this.param = "";//微信的参数
    };
    Authorize.prototype.authorizeUserInfo = function () {
        var that =this;
        that.scope = "snsapi_userinfo";//scope
        that.redirect_uri = domain_url + "api/mp/snsapi_userinfo";//redirect_uri
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.mpappid + "&redirect_uri=" + encodeURIComponent(that.redirect_uri+"?callBackPage="+this.callBackPage+"&param="+this.param)+ "&response_type=code&scope=" + that.scope +  "#wechat_redirect";
    };
    Authorize.prototype.authorizeBase = function () {
        var that =this;
        that.scope = "snsapi_base";//scope
        that.redirect_uri = domain_url + "api/mp/snsapi_base";//redirect_uri
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.mpappid + "&redirect_uri=" + encodeURIComponent(that.redirect_uri+"?callBackPage="+this.callBackPage+"&param="+this.param)+ "&response_type=code&scope=" + that.scope +  "#wechat_redirect";
    };
    Authorize.prototype.getQueryParam =function(name){
        var currentSearch = decodeURIComponent(location.search.slice( 1 ));
        if (currentSearch != '') {
            var paras = currentSearch.split('&');
            for ( var i = 0, l = paras.length, items; i < l; i++ ) {
                var sindex = paras[i].search("=");
                var tname = paras[i].substring(0, sindex);
                var tval = paras[i].substring(sindex + 1, paras[i].length);
                if (tname === name) {
                    return tval;
                }
            }
            return '';
        }
        return '';
    };
    Authorize.prototype.getParam =function(){
        var  jsonobj={};
        var currentSearch = decodeURIComponent(location.search.slice(1)).split('&');
        for ( var i = 0 ; i < currentSearch.length  ; i++ ) {
            var sindex = currentSearch[i].search("=");
            var tname = currentSearch[i].substring(0, sindex);
            var tval = currentSearch[i].substring(sindex + 1, currentSearch[i].length);
            jsonobj[tname] = tval;
        }
        this.param =  encodeURIComponent(JSON.stringify(jsonobj));
    };

    Authorize.prototype.init =function(fn){
        this.getParam();
        var that = this;
        if (!openid||(!nickname && !headimgurl && !sex)) {
            openid = that.getQueryParam("openid");
            openid && $.fn.cookie(mpappid + '_openid', openid, expires_in);
            nickname = that.getQueryParam("nickname");
            nickname && $.fn.cookie(mpappid + '_nickname', nickname, expires_in);
            headimgurl = that.getQueryParam("headimgurl");
            headimgurl && $.fn.cookie(mpappid + '_headimgurl', headimgurl, expires_in);
            sex = that.getQueryParam("sex");
            sex && $.fn.cookie(mpappid + '_sex', sex, expires_in);
            if (!openid||(!nickname && !headimgurl && !sex)) {
                that.authorizeUserInfo();
            }
        } else {
            $.fn.cookie(mpappid + '_openid', openid, expires_in);
            $.fn.cookie(mpappid + '_nickname', nickname, expires_in);
            $.fn.cookie(mpappid + '_headimgurl', headimgurl, expires_in);
            $.fn.cookie(mpappid + '_sex', sex, expires_in);

            if(fn){
                setTimeout(function(){
                    fn();
                },50);
            }
        }
    };

    var authorize_count = 0;
    var getUserInfo = function(){
        if (authorize_count > 0) {
            return;
        }
        authorize_count ++;

        // 从本地缓存中获取用户信息，如果没有需要登陆
        W.userUuid = getData("czb_user_uuid");
        W.userPhone = getData("czb_user_phone");
        W.userRole = getData("czb_user_role") || 1;//0-房东，1-租客
        W.userPassword = getData("czb_user_password");
        W.userStatus = getData("czb_user_status");//用户状态-----租客返回0，有效；房东状态----0，认证成功；1，已删除；2，待审核；3，认证失败;4,认证中;
        W.userName = getData("czb_user_name");

        W.latitude = getData('latitude') || latitude;
        W.longitude =  getData('longitude') || longitude;
        W.cityCode = getData('cityCode') || cityCode;

        //首页、地图找房、房屋详情--游客进入(不做判断)
        if (!/(index|look-housing-map|housing-details)\.html/i.test(location.href)){
            // 有用户id 并且 当前是login页时-（进入user页）
            // 无用户id 并且 当前不是login页-（进入login页）
            var isLogined = W.userUuid && W.userPassword,
                isLoginPage = /login\.html/i.test(location.href);
            if(isLogined && isLoginPage){
                toUrl(jumpUrl+"user/user.html");
            }else if(!isLogined && !isLoginPage){
                // toUrl(jumpUrl+"login/login.html");
            }

            referrer = document.referrer;
        }

    };

    // new Authorize({callBackPage:"index.html"}).init(getUserInfo());

    // loadScript('../js/vconsole.min.js');
    // delData("czb_user_role");
    // delData("czb_user_password");
    // delData("czb_user_uuid");

    var pageStructure = function () {
        var ii, obj = {
            'index': '首页、(租客)我要找房',
            'login': '登录',
            'user': '房东/租客 个人主页',
            'report': '房东 费用报表查询',
            'rent-reference': '房东 租金参考',
            'publish': '房东 发布房源信息',
            'my-rent': '房客 我的租房',
            'message': '消息通知',
            'manage': '房东 房屋管理',
            'look-housing-map': '地图找房',
            'expense-manage': '租客 费用管理',
            'deposit': '房东 房屋托管',
            'apply': '房东 托管申请',
            'repair': '房东 维修审核单',
            'my': '房东 我的托管',
            'authen': '房东 房东身份认证',
        };
        console.group('页面结构说明');
        for(ii in obj) console.log("%c%s", 'color: #996DA7' ,ii+'.html-->'+obj[ii]);
    };
    // pageStructure();//控制台显示页面结构
    new Authorize(getUserInfo()).init();
})(window);