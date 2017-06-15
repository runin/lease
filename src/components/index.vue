<template>
    <div>
        <section class="wrap-page" id="wrap-page">
            <div class="head">
                <input type="text" name="search" placeholder="请输入城中村名称">
                <a href="javascript:;" class="btn-so">搜索</a>
                <!--<a href="javascript:;" class="btn-map">地图找房</a>-->
                <router-link to="/lookHousingMap" class="btn-map">地图找房</router-link>
            </div>
            <!--导航按钮-->
            <div class="menunav" id="menunav">
                <span id="rss"><b>区域</b></span>
                <span id="price"><b>价格</b></span>
                <span id="more"><b>更多</b></span>
            </div>
            <!--子导航-->
            <div class="optionlist" id="optionlist">
                <div class="rssinfo menunav-info moreinfo" id="rssinfo">
                    <div class="regioninfo" id="regioninfo" data-type="blockinfo">
                        <ul class="regionlist" id="regionlist">
                            <li class="high highinit">不限</li>
                        </ul>
                    </div>
                </div>
                <div class="priceinfo menunav-info" id="priceinfo">
                    <div class="pricelist">
                        <a href="javascript:;" class="high highinit">不限</a>
                        <a href="javascript:;" data-lp="0" data-hp="600">600以下</a>
                        <a href="javascript:;" data-lp="600" data-hp="1000">600元-1000元</a>
                        <a href="javascript:;" data-lp="1000" data-hp="2000">1000元-2000元</a>
                        <a href="javascript:;" data-lp="2000" data-hp="3000">2000元-3000元</a>
                        <a href="javascript:;" data-lp="3000" data-hp="4000">3000元-4000元</a>
                        <a href="javascript:;" data-lp="4000" data-hp="100000">4000元以上</a>
                        <div class="diy"><span>自定义</span><input type="number" name="min" placeholder="最低价"><b>—</b><input type="number" name="max" placeholder="最高价"><i>元</i><b class="btn-submit">确定</b></div>
                    </div>
                </div>
                <div class="rssinfo menunav-info moreinfo" id="moreinfo">
                    <div class="regioninfo" id="moreinfoblock" data-type="moreinfo">
                        <ul class="regionlist" id="moreinfolist">
                            <li data-type="rt">整租/合租</li>
                            <li data-type="ht">房型</li>
                            <li data-type="dd">装修</li>
                        </ul>
                    </div>
                    <div class="blockinfo" id="rt">
                        <div class="blocklist">
                            <a href="javascript:;" class="high highinit">不限</a>
                            <a href="javascript:;" data="0">整租</a>
                            <a href="javascript:;" data="1">合租</a>
                        </div>
                    </div>
                    <div class="blockinfo" id="ht">
                        <div class="blocklist">
                            <a href="javascript:;" class="high highinit">不限</a>
                            <a href="javascript:;" data="1">一室</a>
                            <a href="javascript:;" data="2">两室</a>
                            <a href="javascript:;" data="3">三室</a>
                            <a href="javascript:;" data="4">四室及以上</a>
                        </div>
                    </div>
                    <div class="blockinfo" id="dd">
                        <div class="blocklist">
                            <a href="javascript:;" class="high highinit">不限</a>
                            <a href="javascript:;" data="1">精装修</a>
                            <a href="javascript:;" data="2">简装修</a>
                            <a href="javascript:;" data="3">豪华装修</a>
                            <a href="javascript:;" data="4">毛坯</a>
                        </div>
                    </div>
                </div>
            </div>
            <!--导航遮罩-->
            <div class="coverMask"></div>
            <!--房屋列表-->
            <div class="lists" id="lists"></div>
            <a href="javascript:;" class="btn-more">查看更多&gt;&gt;</a>
            <!--空数据提示-->
            <div class="empty"><div class="wrapper"><i></i><p>没有符合条件的结果</p><p>换个条件试试</p></div></div>
        </section>
        <!--返回顶部-->
        <a href="javascript:;" class="btn-gotop"><i></i></a>
        <!--浮动登录按钮-->
        <!--<a href="javascript:;" class="btn-login"><span>请登录账号&gt;</span></a>-->
        <router-link to="/login" class="btn-login"><span>请登录账号&gt;</span></router-link>
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
    * {
        font-size: 24px;
        -webkit-transform: none;
        -moz-transform: none;
        -ms-transform: none;
        transform: none;
    }
    html,
    body {
        background: #efeff4;
        overflow: hidden !important;
    }
    div, ul, li {
        margin: 0;
        padding: 0;
    }
    ul, li {
        list-style: none outside none;
    }
    body {
        position: relative;
        width: 640px;
        margin: 0 auto;
    }
    .wrap-page {
        text-align: center;
    }
    .btn-login {
        position: absolute;
        top: 70vh;
        right: 20px;
        display: block;
        width: 95px;
        height: 95px;
        background: #ff5001;
        border-radius: 5px;
        z-index: 79;
    }
    .btn-login span {
        position: absolute;
        bottom: 6px;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #FFF;
    }
    .btn-login:before {
        content: '';
        display: block;
        position: absolute;
        width: 62px;
        height: 62px;
        top: 6px;
        left: 50%;
        margin-left: -31px;
        border-radius: 100%;
        overflow: hidden;
        background: #FFF;
    }
    .btn-login:after {
        content: '';
        display: block;
        position: absolute;
        top: 12px;
        left: 50%;
        margin-left: -22px;
        width: 44px;
        height: 44px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAA3NCSVQICAjb4U/gAAAAMFBMVEX/////UAH/UAH/UAH/UAH/UAH/UAH/UAH/UAH/UAH/UAH/UAH/UAH/UAH/UAH/UAHc4wKiAAAAEHRSTlMAESIzRFVmd4iZqrvM3e7/dpUBFQAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAD1SURBVCiRtdM9DkFBEAfw5QkRglIlCjUuQESp4Qa0OrWCOAGVlka0juAEFA7gq9BIiEiQeG941uzbGU8j8S9/xezs7KwQmPhs3xEfMQ4AVvaDE/DMmqt3bvM9yTgNr2wYLyWbVAPwToNwBHlFuIx8JtxGvhAeIN909R2QrYLGYVCZujVCW4k6fPyZv9QOOTzU2O9wRWPPEpVOtuo+KlV8QlgVrxH2vGdlxQjjZG9URUbyiXFQco+x7NxkpYXI27zlmqrb3C/qZjTn6vJjtbUl9cCv1kfysBaw7OyDc1wBFvqKaCnIX8CzFl03vuK+05jCTQH+yQ9ClQBVqOGsYwAAAABJRU5ErkJggg==) no-repeat;
    }
    .optionlist {
        display: none;
        z-index: 130;
        position: fixed;
        top: 140px;
        left: 15px;
        width: 607px;
        height: 400px;
        font-size: 24px;
        overflow: hidden;
        text-align: left;
    }
    .regioninfo,
    .linesinfo {
        position: relative;
        width: 100%;
        height: 400px;
        overflow: hidden;
        overflow-y: scroll;
    }
    .switch_button {
        position: relative;
        display: -webkit-box;
        height: 40px;
        background-color: #FFF;
        border-bottom: 1px solid #e7e7e7
    }
    .switch_button div {
        width: 50%;
        text-align: center
    }
    .switch_button div span {
        width: 85px;
        display: inline-block;
        height: 38px;
        line-height: 40px
    }
    .switch_button .slt span {
        color: #60ad00;
        border-bottom: 3px solid #60ad00
    }
    .rssinfo,
    .priceinfo {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background: #FFF
    }
    .moreinfo {
        height: auto!important
    }
    .optionlist a {
        display: block;
        color: #333
    }
    .optionlist a:visited {
        color: #333
    }
    .regionlist {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%
    }
    .regionlist li {
        position: relative;
        height: 70px;
        line-height: 69px;
        padding: 0 20px;
        color: #333;
        font-size: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #dfe0e1
    }
    .regionlist li:active {
        background: #f4f4f4
    }

    /*.pricelist .high:before,
    .regionlist .high:before {
        position: absolute;
        left: 0;
        content: '';
        top: 0;
        height: 100%;
        width: 2px;
        background: #ff5001
    }*/

    .regionlist li a {
        border-bottom: 1px solid #e7e7e7;
        height: 69px
    }
    .regionlist li span {
        display: block;
        width: 100%;
        border-bottom: 1px solid #e7e7e7;
        height: 69px
    }
    .blockinfo {
        display: none;
        position: absolute;
        z-index: 20;
        top: 0;
        right: 0;
        width: 50%;
        height: 400px;
        overflow: hidden;
        overflow-y: scroll;
        background: #fdfdfd
    }
    .blockinfo {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-left: 1px solid #dfe0e1
    }
    .blocklist,
    .pricelist {
        position: absolute;
        z-index: 20;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
        -webkit-text-size-adjust: none;
        text-size-adjust: none
    }
    .blocklist a.high {
        background-color: #f8f8f8!important
    }
    .blocklist a {
        font-size: 24px;
        padding: 0 20px;
        height: 69px;
        line-height: 69px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        width: 100%;
        text-align: left
    }
    .regionlist li:last-child span,
    .pricelist a:last-child {
        border-bottom: 1px solid #FFF
    }
    .pricelist>a,
    .pricelist .diy {
        /*position: relative;*/
        padding: 0 20px;
        position: relative;
        height: 69px;
        line-height: 69px;
        border-bottom: 1px solid #e7e7e7
    }
    .diy span {
        margin-right: 10px;
    }
    .diy b {
        color: #AAA;
    }
    .diy input {
        display: inline-block;
        width: 110px;
        height: 42px;
        border: 1px solid #ccc;
        text-align: center;
        margin: 0 6px;
    }
    .optionlist .btn-submit {
        position: absolute;
        display: inline-block;
        width: 100px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        color: #FFF;
        right: 12px;
        top: 12px;
        border-radius: 10px;
        background: #FF5000;
    }
    .optionlist .btn-submit:hover,
    .optionlist .btn-submit:visited,
    .optionlist .btn-submit:active {
        color: #FFF !important;
        background: #FF5000 !important;
    }
    .regionlist .highlight {
        color: #ff5001
    }
    .menunav .high,
    .optionlist .high,
    .optionlist .high:visited,
    .optionlist .high a,
    .optionlist .high a:visited {
        color: #ff5001
    }
    .regionlist .high,
    .regionlist .high a,
    .blockinfo .high,
    .blockinfo .high a,
    .highchild {
        color: #ff5001!important
    }
    .optionlist .teselink,
    .optionlist .testlink:visited {
        color: #e54c00;
        background: #fff
    }
    .blocklist a:active,
    .pricelist a:active {
        background: #ededed!important
    }
    .rssinfo,
    .priceinfo {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        height: 100%;
        width: 100%;
        overflow: hidden;
        overflow-y: scroll;
        background: #FFF
    }
    .moreinfo {
        height: auto!important
    }
    .optionlist a {
        display: block;
        color: #333
    }
    .optionlist a:visited {
        color: #333
    }
    .head {
        position: fixed;
        width: 640px;
        padding: 15px 0 83px 15px;
        z-index: 22;
        top: 0;
        left: 50%;
        margin-left: -320px;
        background: #efeff4;
        text-align: left;
    }
    .btn-so {
        display: inline-block;
        vertical-align: middle;
        color: #ff5001;
        margin-left: 10px;
    }
    input[name="search"] {
        width: 360px;
        height: 25px;
        padding: 15px 35px;
        border: 1px solid #d7d7db;
        color: #999;
        border-radius: 70px;
    }
    .btn-map {
        position: absolute;
        top: 15px;
        right: 20px;
        display: inline-block;
        width: 50px;
        word-break: break-all;
        padding-left: 37px;
        font-size: 22px;
        color: #333;
    }
    .btn-map:before {
        content: '';
        position: absolute;
        top: 0;
        left: -8px;
        display: block;
        width: 37px;
        height: 50px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAyCAMAAADsk+ISAAAAA3NCSVQICAjb4U/gAAAAhFBMVEX///+bion/UAGbion/UAGbion/UAGbiom1emW3emP/UAGbion/UAGbion/UAGbion/UAGbiomeh4Slg3r/UAGogne3emP/UAHJb0v/UAHRa0DUaTzVaDr/UAHbZDH/UAHnXiHrWxzqXB3tWhrxWBT/UAH5Uwn/UAH9UQT8UgX/UAH/UAKQss9oAAAALHRSTlMAEREiIjMzRERERFVVZmZ3d4iIiIiZmZmqqru7u7vMzN3d3d3d3e7u/////+bjLlIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAB9klEQVQ4jXVU7ULcIBBEDrGNkQSNxmuLsa24V3z/9ytL+Fg4sn8O9mZndicAYyT4uBgLDqxZRs76IVdwJWCVHYw4uzbOogWpwGNXJQUXUq028KkatGLSDCQzGEytFIRqdmzoR+Q710zmeihuKJuqaxqN2JvwjZsuiDHPBiIV2CMPuY0y0rOS4bgcJKkZ/L9ypyp60VvipwlkHAiVyr4rQgacjb6rCgQbVDDf2YheJUsEeou8A/qZRAPAlLI1D4ujrUXAIGE6IoDce/g+IC4ltgSZGwXzaI6mgWwlmYNIhOJ6m/zkVTHQ7m1ZqsIbul/KefBL2Hml73aJ2TMuZdHBzwCLP9ELBMNzUlY6slwikEUQtWcymrQRZPM185k5UuYjz5Xxt9aofHbGpO0/zMaOYktjCErWxJhPNDpgD1BbcQQ7m7sgVRxpNiSwnDwCW3PXYzRzNfeIZKvnqTsAab1k2gHmax8luQ97CGj0upUddhYuMc3O/SeGVwriwEK860Vz61kTYimTL0ffbG9tSLRH7x67+fbpPp+01k/+9/tNF3M3af3yz/32qD/u8qL1dHeFOXmMj9cv90v/dF+vYTedGtQO0vrNXX5c3FvcTQco/e4/1bs+QJ0S7PHDfTwmUKu4d4/x/Pc5Yq67D07c3j/s0Onh/pY68R/3YFIykt6gOgAAAABJRU5ErkJggg==) no-repeat;
    }
    .menunav {
        position: fixed;
        width: 640px;
        top: 87px;
        /*left: 50%;*/
        margin-left: 0;
        font-size: 0;
        text-align: center;
        margin: 0 auto;
        padding: 3px 15px 17px;
        z-index: 99;
        text-align: justify;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .menunav>span {
        position: relative;
        display: inline-block;
        width: 155px;
        height: 48px;
        line-height: 48px;
        padding-right: 29px;
        border: 1px solid #c5c4c8;
        background: #FFF;
        margin-right: 25px;
        text-align: center;
        vertical-align: bottom;
    }
    .menunav>span:last-child {
        margin-right: 0;
    }
    .menunav>span b {
        width: 90%;
        display: block;
        font-size: 22px;
        color: #333;
        font-weight: normal;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 0 auto;
    }
    .menunav>span:after {
        content: '';
        display: block;
        width: 29px;
        height: 49px;
        background: url(../../static/images/icon-user.png) 0 -268px no-repeat;
        background-size: 62px;
        position: absolute;
        right: -2px;
        top: -1px;
        z-index: 1;
    }
    .lists {
        width: 100%;
        padding: 157px 0 0;
        font-size: 0;
        text-align: left;
    }
    .lists .list {
        position: relative;
        display: block;
        background: #FFF;
        padding: 10px 20px 10px 177px;
        overflow: hidden;
        min-height: 138px;
        margin-bottom: 3px;
        font-size: 24px;
    }
    .lists .list:last-child {
        margin-bottom: 0;
    }
    .lists .list img {
        position: absolute;
        width: 138px;
        height: 138px;
        top: 10px;
        left: 20px;
    }
    .lists .list p {
        display: -webkit-box;
        font-weight: bold;
        color: #333;
        margin: 10px auto 35px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        min-height: 50px;
    }
    .lists .list b {
        font-weight: normal;
    }
    .lists .list i {
        position: absolute;
        right: 20px;
        color: #ff5001;
    }
    .coverMask {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, .4);
        z-index: 80;
    }
    .btn-more {
        display: none;
        height: 75px;
        line-height: 75px;
        font-size: 22px;
        color: #666;
        text-align: center;
        background: #efeff4;
    }
    .btn-gotop {
        display: none;
        position: fixed;
        right: 20px;
        bottom: 95px;
        height: 80px;
        width: 80px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        z-index: 99;
    }
    .btn-gotop i {
        margin: 37px auto 0;
        display: block;
        position: relative;
        height: 24px;
        width: 4px;
        background: #fff;
    }
    .btn-gotop i:before {
        content: '';
        position: absolute;
        left: -18px;
        top: -15px;
        width: 40px;
        height: 4px;
        background: #fff;
    }
    .btn-gotop i:after {
        content: '';
        position: absolute;
        top: -2px;
        left: -9px;
        height: 17px;
        width: 17px;
        border: 4px solid #fff;
        border-width: 4px 4px 0 0;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
    .empty {
        display: none;
        position: relative;
        padding-top: 250px;
        text-align: center;
    }
    .empty .wrapper {
        position: relative;
        display: inline-block;
        text-align: left;
        padding-left: 80px;
    }
    .empty i {
        position: absolute;
        width: 66px;
        height: 71px;
        top: 3px;
        left: 0;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABHBAMAAABBt4xoAAAAA3NCSVQICAjb4U/gAAAAMFBMVEX///+ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZnHHh8xAAAAEHRSTlMAESIzRFVmd4iZqrvM3e7/dpUBFQAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAJASURBVEiJjVU9bxNBEN1bE7CJo4SegP8A2A10QCoEVSLlB0CBhERjJCREA6ZAoiMU0BL4BaaiQkqoUeRAS6TwISSgMYJAcJzzY/a4u92bnbvlNbdz93Z39t2bWaVy6PO37l9pqVJE14YgTF7MlRBqfaQYL8iENeTYlyjRqvkUv365bZ57wkZnzNQb5sNps9hnj3CQ3n5JTxHdpuAuZ/SAP/nK0R1gxAiHaIuODTVt9LDI6AJP3bhOSxYINf7CTFly43kvM8r8oxuvYo+nvoKxE2ngDWdMAws2Ogx0OEMPsW6jtnd6ZRT65abxwWfMuIkMuTwGJGIrG08JaZD0wPVs3EDsE5Raw/Ns2OSC/kMX77PhcTdrizZ+ZsNz+CExZu3ERXyXGDPYtRtuSoxpm17X1beEEVrjUpBRmunvbNgOnnZWVsyRKax6PfjnDpT9/ct5EHQQuVA4zDG3QkqcvGODcDVIFdUsVBSVoFeVrFCbXrugkxRqqDbkufaKmxgD4JkbN2AtmC8aO3P0gPUklfScUSsLohVqhp8YY4pa+tdUFP0gae8tRjEdN75HDTO6QFvgnS9RsjImWxvJ/TA6MsA+79y6bzv/uKNO+Lkq/SQjfOskEgnOuzhI7ofHyfKLroNsMqeu3lxOt6e+IxrcQQ8TwZwuGqwtC+gjLrsTUxwFXlUzom3fWAwnPWNxkGq71QxjrKVqBt1DO9UMKoKQalRrb6sZkWAThnnBJkVor5I8nHWuGRn/YZNuUNe6ZMYiHqm/vIh7ZKvZwIoAAAAASUVORK5CYII=) no-repeat;
    }
    .empty p {
        font-size: 28px;
        color: #999;
        line-height: 1.5;
    }
    .empty p:last-child {
        font-size: 24px;
        color: #999;
    }
</style>
