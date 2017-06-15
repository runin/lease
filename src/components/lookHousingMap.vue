<template>
    <div>
        <header class="horizontal"><i class="back"><</i><input type="text" id="value" placeholder="请输入城中村名称"/><label class="search" id="search">搜索</label></header>
        <section class="wrap-page" id="wrap-page">
        </section>
        <footer id="footer">
            <ul class="bottom-nav"></ul>
        </footer>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>

<style scoped>
    .smnoprint {
        position: absolute;
        top: 59px!important;
    }
    .smnoprint label{
        font-size: 12px;
    }
    header{
        position: fixed;
        width: 90%;
        z-index: 1;
        background-color: #EFEFF4;
        padding: 0 5%;
    }
    header.horizontal{
        -webkit-box-pack: justify;
    }
    header .search{
        color: #FF5001;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 1px;
        display: -webkit-box;
        margin-top: 23px;
    }
    header i.back{
        font-size: 30px;
        display: -webkit-box;
        margin: 12px 0 0 0;
        font-weight: bold;
    }
    header input{
        padding: 8px 10px;
        margin: 14px 0 14px 0;
        width: 66%;
        font-size: 12px;
        border-radius: 15px;
        border: 1px solid #D7D7DB;
        display: -webkit-box;
    }
    input::-webkit-input-placeholder{
        color: #999999;
    }
    input[type="search"]{-webkit-appearance:none;}
    input::-webkit-search-cancel-button {display: none;}
    footer{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        max-height: 272px;
        overflow: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        background: #FFF;
        -webkit-transform: translate3d(0, 100%, 0);
    }
    ul{
        margin: 0;
        padding: 0;
    }
    li.horizontal {
        -webkit-box-pack: justify;
    }
    li{
        padding: 10px 20px;
        height: 70px;
    }
    li:not(:last-child){
        border-bottom: 1px solid #DBDBDB;
    }
    li div{
        display: -webkit-box;
    }
    li div.img{
        width: 70px;
    }
    li div.vertical{
        width: -webkit-calc(100% - 145px);
        width: calc(100% - 145px);
    }
    li div img{
        width: 70px;
        height: 70px;
    }
    li div p{
        display: block;
    }
    li div p.name{
        font-size: 12px;
        font-weight: bold;
        margin: 10px 0 15px;
        width: 100%;
        -webkit-line-clamp: 2;
    }
    li div p.info{
        font-size: 12px;
    }
    li div.money{
        color: #FF5001;
        font-size: 12px;
        position: relative;
        top: 40px;
    }
    .animated {
        -webkit-animation-duration: .7s;
        animation-duration: .7s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes slideInUp {
        0% {
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
            visibility: visible;
        }

        100% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    .slideInUp {
        -webkit-animation-name: slideInUp;
        animation-name: slideInUp;
    }
    @-webkit-keyframes slideOutDown {
        0% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

        100% {
            visibility: hidden;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }
    }
    .slideOutDown {
        -webkit-animation-name: slideOutDown;
        animation-name: slideOutDown;
    }
</style>
