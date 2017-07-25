<template>
    <section class="wrap-page" id="authen">

        <h1>房东基本信息</h1>
        <form>
            <p class="horizontal"><label>姓名：</label><input id="name" type="text" /></p>
            <p class="horizontal"><label>手机号码：</label><input id="mobile" type="number" /></p>
            <p class="horizontal"><label>身份证号：</label><input id="card" type="text" placeholder="请填写18位身份证号码"/></p>
            <p class="horizontal" id="select_contact">
                <label>房屋地址：</label>
                <span class="ellipsis" id="province" data-province-code="" data-province-name=""></span>
                <span class="ellipsis" id="city" data-city-code="" data-city-name=""></span>
                <span class="ellipsis" id="district" data-district-code="" data-district-name=""></span>
                <span class="visibility"  data-province-code="" data-city-code="" data-district-code="" id="show_contact"></span>

                <!--<span class="ellipsis" id="province" data-province-code="610000" data-province-name="陕西省">陕西省</span>
                <span class="ellipsis" id="city" data-city-code="610100" data-city-name="西安市">西安市</span>
                <span class="ellipsis" id="district" data-district-code="610113" data-district-name="雁塔区">雁塔区</span>
                <span class="visibility"  data-province-code="610000" data-city-code="610100" data-district-code="610113" id="show_contact">陕西省 西安市 雁塔区</span>-->
            </p>
            <p class="horizontal"><input type="text" id="addressAll" placeholder="请填写详细地址，不少于6个字"></p>
        </form>
        <h1>认证申请资料</h1>
        <form class="form-bottom">
            <div class="horizontal upload">
                <label>房屋产权证明<br/>或村委政府房<br/>屋权证明照片：</label>
                <p id="upload-box" class="photo-wrapper upload-box">
                    <a href="javascript:void(0)" class="icon btn-upload"></a>
                </p>
            </div>
            <p class="horizontal company-p">
                <label>当面认证：</label>
                <span data-code="" data-mp="" id="company" class="disabled">请选择所在村的服务公司</span>
            </p>
            <p class="h2">认证须知：若有您所在村服务公司可选，则可选服务公司当面认证或提交资质证明；若您房屋所在村无服务公司可选，则选择出租宝总公司并提交资质证明。</p>
        </form>

        <h2 class="red-text none" id="reason">您的认证申请失败，失败原因是:<span></span></h2>

        <a href="#" id="authen-go" class="button">申请认证房东身份</a>
    </section>
</template>

<script>
  export default {
    name: 'authen',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style scoped>
    .wrap-page{
        padding: 35px 20px;
    }
    .horizontal {
        -webkit-box-pack: justify;
    }
    .visibility{
        visibility: hidden;
        height: 0px;
        width: 0px;
        display: block;
    }
    .button {
        border-radius: 6px;
        margin-top: 35px;
        margin-bottom: 50px;
    }
    .grey{
        background-color: #999999;
        color: #e0e0e0;
    }
    h1{
        font-size: 28px;
        color: #333333;
        font-weight: bold;
        margin: 0;
    }
    h1:before{
        content: '* ';
        color: #FF1B1B;
        vertical-align: middle;
    }
    form{
        margin: 20px auto 40px;
        background: #FFF;
        border: 1px solid #D7D7DB;
        padding: 17px 10px;
    }
    form.form-bottom{
        padding: 0 10px 17px;
    }
    form p:not(:last-child){
        font-size: 12px;
        color: #333333;
        margin-bottom: 25px;
    }
    form.form-bottom div.upload{
        -webkit-box-pack: start;
    }
    form.form-bottom div.upload label{
        line-height: 28px;
    }
    form.form-bottom p.company-p span{
        width: 415px;
        position: relative;
    }
    form.form-bottom p.company-p label{
        width: 142px;
    }
    input::-webkit-input-placeholder{
        color: #999999;
    }
    form label{
        font-size: 26px;
        padding: 20px 0;
        display: -webkit-box;
    }
    form p input, form p span{
        padding: 20px 10px;
        background: #F9F9F9;
        border-radius: 5px;
        border: none;
        font-size: 24px;
        color: #999999;
        display: -webkit-box;
        max-height: 69px;
    }
    form p span{
        height: 69px;
        line-height: 69px;
        padding: 0;
    }
    form p span{
        width: 150px;
        text-align: center;
        display: inline-block;
    }
    form p:first-child input{
        width: 480px;
    }
    form p:not(:first-child) input{
        width: 430px;
    }
    form p:nth-child(4) span:nth-child(4){
        margin-left: 0;
    }
    form p:nth-child(4) span:nth-child(3){
        -webkit-border-radius: 0px;
        margin-left: 0;
    }
    form p:nth-child(4) span{
        position: relative;
        /*overflow: visible;*/
    }
    form p:nth-child(4) span:after, form.form-bottom p.company-p span:after{
        content: '';
        display: block;
        width: 29px;
        height: 69px;
        background: url(../assets/images/icon-user.png) 0 -336px no-repeat;
        background-size: 79px;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
    }
    form p:nth-child(5){
        border-bottom: 1px solid #999999;
        color: #999999;
        font-size: 26px;
    }
    form p:nth-child(5) input{
        background: transparent;
        border: 0;
        width: 100%;
        text-align: center;
        margin-left: 0;
        color: #999999!important;
    }
    p.h2{
        font-size: 20px;
    }
    /*地址插件640-s*/
    .address-select #iosSelectTitle{
        font-size: 28px;
    }
    .address-select header.iosselect-header a,.address-select ul li.side2 {
        font-size: 28px;
    }
    .address-select ul li.side1 {
        font-size: 30px;
    }
    .address-select ul li.at {
        font-size: 32px;
    }
    .address-select ul li {
        font-size: 26px;
    }
    /*地址插件640-e*/


    /***** upload *****/
    .upload-box {
        margin: 18px 0 20px;
        text-align: center;
        padding-left: 2px;
    }
    .upload-box form {
        height: 0;
        opacity: 0;
        position: absolute;
        top: -100px;
    }
    .upload-box form input {
        opacity: 0;
    }
    .upload-box .icon {
        display: inline-block;
        vertical-align: top;
        width: 82px;
        height: 82px;
        line-height: 82px;
        text-align: center;
        background: #fff;
        border-radius: 9px;
    }
    .upload-box .icon:before {
        content: '';
        display: inline-block;
        vertical-align: -2px;
        background: url(../assets/images/icon-user.png) 0 -306px no-repeat;
        background-size: 79px;
    }

    .upload-box .img-preview {
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #babbc2;
        text-align: center;
        width: 82px;
        height: 82px;
        line-height: 82px;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
        border-radius: 9px;
    }

    .form-item .photo-wrapper a.add{
        display: block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 36px;
        border: 1px dashed #dfdfdf;
        border-radius: 5px;
        color: white;
        font-size: 18px;
    }
    .upload-box .img-preview .close {
        content: '';
        display: block;
        background: url(../assets/images/close.png) no-repeat 0 0;
        background-size: 12px auto;
        width: 12px;
        height: 12px;
        position: absolute;
        right: -10px;
        top: -5px;
        cursor: pointer;
        z-index: 1;
    }
    .upload-box .img-preview .uploading {
        display: none;
    }
    .upload-box .img-preview.loading .uploading {
        height: 25px;
        width: 25px;
        margin: 0px auto;
        position: relative;
        -webkit-animation: loading-rotation .6s infinite linear;
        animation: loading-rotation .6s infinite linear;
        border-left: 3px solid rgba(255, 153, 163, 0.55);
        border-right: 3px solid rgba(255, 153, 163, 0.55);
        border-bottom: 3px solid rgba(255, 153, 163, 0.55);
        border-top: 3px solid rgba(128,26,46,.85);
        border-radius: 100%;
        display: block;
        line-height: 0;
        font-size: 0;
    }
    .upload-box .img-preview .lc {
        position: absolute;
        left: 26px;
        top: 26px;
        width: auto;
        background: transparent;
    }
    .upload-box .img-preview .ic {
        display: block;
        width: 82px;
        height: 82px;
        line-height: 82px;
        text-align: center;
        background: #C9C9C9;
        overflow: hidden;
        max-height: 82px;
    }
    .upload-box .img-preview img {
        vertical-align: middle;
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
        width: auto;
    }
    .upload-box .btn-upload {
        border: 1px solid #777777;
        margin-bottom: 10px;
    }
    .upload-box .btn-upload:before {
        width: 34px;
        height: 31px;
        vertical-align: -7px;
    }

    .preview-box {
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.8);
        z-index: 9999999;
        background-size: 320px auto;
        top: 0;
        left: 0;
    }
    @-webkit-keyframes loading-rotation {
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(359deg);}
    }
    @keyframes loading-rotation {
        from {transform: rotate(0deg);}
        to {transform: rotate(359deg);}
    }
    /***** upload *****/

    .alert-title{
        font-size: 22px!important;
        line-height: 40px!important;
        margin: 60px 35px -20px!important;
        color: #333333!important;
    }
</style>
