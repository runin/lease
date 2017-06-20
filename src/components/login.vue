<template>
    <section class="wrap-page">
        <section class="wrap" id="wrap" v-bind:data-type="pageType" v-bind:login-type="loginType">
            <img class="logo" src="../../static/images/logo.png" />
            <div class="horizontal master-guest">
                <div v-bind:class="{ right: isRight }" v-tap="{ methods: toggle }"></div>
                <div v-bind:class="{ right: !isRight }" v-tap="{ methods: toggle }"></div>
            </div>
            <div class="login" login-type="message">
                <p><img src="../../static/images/icon2.png"><input ref="mobile" v-model="mobile" type="number" placeholder="请输入手机号码"/><i></i></p>
                <p id="message-p" class="message-p"><img src="../../static/images/icon3.png"><input ref="code" v-model="code" type="text" placeholder="请输入验证码"/><label id="get-code" v-bind:class="{ disabled: codeDisabled }" v-tap="{ methods: getCode }">{{ coedText }}</label></p>
                <p class="password-p" id="password-p"><img src="../../static/images/icon3.png"><input ref="password" v-model="password" type="password" placeholder="请输入密码（6-15位字母与数字）"/></p>
            </div>
            <a href="#" id="reg-btn" v-tap="{ methods: register }" class="button reg-btn">注册</a>
            <a href="#" id="login-btn" class="button login-btn" v-tap="{ methods: loginBtn}">登录</a>
            <div class="tap-swtich-login" id="tap-swtich-login" v-tap="{ methods: typeChange, pageType: 'login' }">切换至登录页面</div>


            <div class="button-type" id="button-type">
                <label class="register-tip" id="register-tip" v-tap="{ methods: typeChange, pageType: 'reg', loginType: 'message' }">立即注册</label>
                <label class="password-tip" id="password-tip" v-tap="{ methods: typeChange, loginType: 'password' }">密码登录</label>
                <label class="message-tip" id="message-tip" v-tap="{ methods: typeChange, loginType: 'message' }">验证码登录</label>
            </div>
        </section>

        <section id="password-set" class="password-set none">
            <img src="../../static/images/logo.png" />
            <p><input type="password" ref="passWordConfirm" v-model="passWordConfirm" placeholder="请输入密码（6-15位字母与数字）"/><label>设置登录密码，可更好的保障账号信息安全</label></p>
            <a href="#" id="confirm" class="button">确认</a>
        </section>
    </section>
</template>

<script>
import api from '../api/api'
    export default {
        name: 'index',
        data () {
            return {
                pageType: 'reg',/*注册标识-reg 登录标识-login*/
                loginType: 'message',/*短信登录方式标识-message  密码登录方式标识-password*/
                isRight: true,
                customerType: 0, //0-房东 1-租客
                mobile: '',
                password: '',
                code: '',
                passWordConfirm: '',
                codeDisabled: false,
                coedText: '短信验证码'
            }
        },
        methods:{
            init(){
                console.log('my name is init');
            },
            verify(loginType){
                let that = this;
                let refs = that.$refs;
                let mobileVal = that.mobile;
                let codeVal = that.code;
                let passWordVal = that.password;
                let passWordConfirmVal = that.passWordConfirm;
                let telReg = /^\d{11}$/;
                let passWordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
                switch (loginType){
                    case 'message'://手机+验证码
                        if (!telReg.test(mobileVal)) {
                            showTips('输入正确手机号码');
                            res.mobile.focus();
                            return false;
                        }
                        if (codeVal == '') {
                            showTips('请填写验证码');
                            refs.code.focus();
                            return  false;
                        }
                        return true;
                        break;
                    case 'password'://手机+密码
                        if (!telReg.test(mobileVal)) {
                            showTips('输入正确手机号码');
                            refs.mobile.focus();
                            return false;
                        }
                        if(!passWordReg.test(passWordVal)||passWordVal.length<6||passWordVal.length>15){
                            showTips('密码为6-15位的数字和字母的组合');
                            refs.password.focus();
                            return false;
                        }
                        return true;
                        break;
                    case 'onePassword'://密码
                        if(!passWordReg.test(passWordConfirmVal)||passWordConfirmVal.length<6||passWordConfirmVal.length>15){
                            showTips('密码必须为6-15位的数字和字母的组合');
                            refs.password.focus();
                            return false;
                        }
                        return true;
                        break;
                    case 'oneMobile'://手机号码
                        if (!telReg.test(mobileVal)) {
                            showTips('输入正确手机号码');
                            refs.mobile.focus();
                            return false;
                        }
                        return true;
                        break;
                }
            },
            toggle(){
                let that = this;
                that.isRight = !that.isRight;
                that.isRight ? that.customerType = 0 : that.customerType = 1;
            },
            typeChange(params){
                if(params.pageType) this.pageType = params.pageType;
                if(params.loginType) this.loginType = params.loginType;
            },
            getCode(){
                let that = this;
                if(that.verify('oneMobile')){
                    api.callbackUserSmsHandler(that.mobile).then(function(data){
                        showTips("验证码发送成功");
                        that.timeCountfunction(60);
                        that.codeDisabled = true;
                    },function (err) {
                        showTips("验证码发送失败，请重新尝试");
                        that.codeDisabled = false;
                    });
                }
            },
            loginBtn(){
                let that = this;
                let dataParameter = {};

                if(that.verify(that.loginType)){
                    dataParameter.ph = that.mobile;
                    if(that.loginType == 'message'){
                        dataParameter.cd = that.code;
                    }else if(that.loginType == 'password'){
                        dataParameter.pd = hex_md5(that.password);
                    }
                    api.callbackUserLoginHandler(dataParameter).then(function(data){
                        showTips('登录成功！')
                    },function (err) {
                        showTips('登录失败！')
                    })
                }
            },
            timeCountfunction(step){
                let that = this;
                let steps = step || 60;
                let timer = setInterval(function(){
                    if(steps === 0){
                        that.coedText = "重新获取";
                        that.codeDisabled = true;
                        clearInterval(timer);
                        return;
                    }
                    that.coedText = "重新发送"+ steps;
                    steps-- ;
                },1000)
            },
            register(){
                let that = this;
                let param = {};

                if(that.verify(that.loginType)){
                    param.ph = that.mobile;
                    param.cd = that.code;
                    param.rl = that.customerType;
                    api.callbackUserRegisterHandler(param).then(function(data){
                        showTips('注册成功！')
                    },function (err) {
                        showTips('注册失败！');
                    });
                }
            }
        },
        created(){
            this.init();
        }
    }

</script>

<style scoped>
    .wrap{
        margin-top: 80px;
    }
    .master-guest{
        margin: 0 auto;
        display: none;
    }
    .master-guest div{
        display: -webkit-inline-box;
        -webkit-box-flex: 1;
        width: 144px;
        height: 144px;
        border-radius: 72px;
        background: url("../../static/images/icon1.png") center no-repeat;
        position: relative;
    }
    .master-guest div img{
        margin: 0 auto;
    }
    .master-guest div:first-child{
        margin-right: 7vw;
    }
    .master-guest div:last-child{
        margin-left: 7vw;
    }
    .master-guest div:first-child:before{
        content: '我是房主';
        display: block;
        font-size: 30px;
        position: absolute;
        bottom: -45px;
        width: 100%;
        text-align: center;
    }
    .master-guest div:last-child:before{
        content: '我是租客';
        display: block;
        font-size: 30px;
        position: absolute;
        bottom: -45px;
        width: 100%;
        text-align: center;
    }
    .right:after{
        content: '';
        display: block;
        left: 0;
        width: 144px;
        height: 144px;
        border-radius: 72px;
        background: url(../../static/images/icon1ed.png) center no-repeat;
        position: absolute;
        top: 0;
        z-index: 1;
    }
    .login{
        margin: 87px 40px 0;
        background: #fff;
        border: 1px solid rgba(0, 0, 0, .33);
        border-radius: 12px;
        padding: 0 28px;
    }
    .login p{
        line-height: 100px;
    }
    .login img{
        display: inline-block;
        margin-right: 25px;
        position: relative;
        top: 6px;
        width: 30px;
    }
    .login input{
        display: inline-block;
        font-size: 26px;
        background: transparent;
        border: none;
        padding: 40px 3px;
        width: 85%;
        border: 0;
        outline:none;
        -webkit-appearance:none;
    }
    input::-webkit-input-placeholder{
        color: #333;
    }
    .login p i{
        display: block;
        height: 1px;
        border-bottom: 2px solid #666666;
        margin-left: 55px;
    }
    .login p:nth-child(2) input{
        width: 63%;
    }
    .login p:nth-child(2) label{
        font-size: 20px;
        color: #FFF;
        padding: 9px 9px;
        background: #FB5000;
        border-radius: 5px;
    }
    .login p:nth-child(2) label.disabled{
        background: #B8BEC5;
    }
    .button{
        margin: 29px 40px 0;
        display: none;
    }
    .tap-swtich-login{
        font-size: 30px;
        float: right;
        margin: 20px 40px 0;
        display: none;
    }
    .button-type{
        font-size: 30px;
        text-align: center;
        margin: 20px auto 0;
    }
    .button-type label{
        display: inline-block;
        height: 36px;
    }
    .button-type label:first-child{
        padding-right: 16px;
        border-right: 1px solid #333;
    }
    .button-type label:last-child{
        padding-left: 5px
    }
    .password-set img{
        margin: 60px auto 115px;
        width: 155px;
    }
    .password-set input{
        display: block;
        height: 89px;
        line-height: 89px;
        border-radius: 14px;
        border: 1px solid rgba(0, 0, 0, .22);
        background: #fff;
        padding-left: 20px;
        width: 540px;
        margin: 0 auto;
        font-size: 26px;
    }
    .password-set input::-webkit-input-placeholder{
        color: #333;
    }
    .password-set label{
        display: block;
        margin: 12px auto 74px;
        text-align: center;
        font-size: 24px;
    }
    .password-set .button{
        display: block;
    }
    .logo{
        width: 155px;
    }

    /*注册标识-reg 登录标识-login*/
    .wrap[data-type='reg'] .master-guest{
        display: -webkit-box;
    }
    .wrap[data-type='reg'] .reg-btn{
        display: block;
    }
    .wrap[data-type='reg'] .tap-swtich-login{
        display: block;
    }
    .wrap[data-type='reg'] .login-btn{
        display: none;
    }
    .wrap[data-type='reg'] .logo{
        display: none;
    }
    .wrap[data-type='reg'] .password-p,

    .wrap[data-type='login'] .login-btn{
        display: block;
    }
    .wrap[data-type='reg'] .button-type{
        display: none;
    }
    .wrap[data-type='login'] .button-type{
        display: block;
    }

    /*短信登录方式标识-message  密码登录方式标识-password*/
    .wrap[login-type='message'] .message-p{
        display: block;
    }
    .wrap[login-type='message'] .password-p{
        display: none;
    }
    .wrap[login-type='password'] .password-p{
        display: block;
    }
    .wrap[login-type='password'] .message-p{
        display: none;
    }
    .wrap[login-type='message'] .message-tip{
        display: none;
    }
    .wrap[login-type='message'] .password-tip{
        display: inline-block;
    }
    .wrap[login-type='password'] .password-tip{
        display: none;
    }
    .wrap[login-type='password'] .message-tip{
        display: inline-block;
    }
</style>
