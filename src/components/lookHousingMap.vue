<template>
    <div id="lookHousingMap">
        <header class="horizontal">
            <i class="back"><</i>
            <input type="text" ref="value" placeholder="请输入城中村名称"/>
            <label class="search" id="search">搜索</label>
        </header>
        <section class="wrap-page" ref="wrapPage">
        </section>
        <footer ref="footer">
            <ul class="bottom-nav"></ul>
        </footer>
    </div>
</template>

<script>
import api from '../api/api'
export default {
  name: 'lookHousingMap',
    data () {
        return {
          Map: qq.maps.Map,
          Marker: qq.maps.Marker,
          LatLng: qq.maps.LatLng,
          map: null,
          thatMarker: null,
          MarkerCluster: qq.maps.MarkerCluster,//在地图中创建marker标记点聚合
          markers: new qq.maps.MVCArray(),//一个可变的MVC数组。
          Event: qq.maps.event,//调用地图事件
          markerClusterer: null,
          isSearch: false,
          lt: 0,
          lat: 0,
        }
    },
  mounted () {
    this.initMap(latitude, longitude)
    this.getMap(latitude, longitude)
  },
  methods: {
    init () {
    },
    getMap (latitude, longitude) {
      var that = this;
      api.callbackQueryHouseHandler(latitude, longitude).then(function (data) {
        var mapData = [];
        for(let x of data.list) {mapData.push(`${x.lat},${x.lt}`.split(','));}
        mapData = unique1(mapData);
        if(that.isSearch){
          H.lookHousingMap.initMap(data.list[0].lat, data.list[0].lt, 18);
          that.tpl(data.list);
          that.$value.val('');
          that.createCluster(mapData);
        }else{
          that.createCluster(mapData);
        }
      }, function (err) {
        if(that.isSearch){
          showTips('没有符合条件的结果,换个条件试试！');
        }
      })
    },
    initMap (latitude, longitude, reInitZoom) {
      var that = this;
      var dom = that.$refs.wrapPage;
//      dom.innerHTML = '';
      that.Map= qq.maps.Map,
        that.Marker= qq.maps.Marker,
        that.LatLng= qq.maps.LatLng,
        that.map= null,
        that.thatMarker= null,
        that.MarkerCluster= qq.maps.MarkerCluster,//在地图中创建marker标记点聚合
        that.markers= new qq.maps.MVCArray(),//一个可变的MVC数组。
        that.Event= qq.maps.event,//调用地图事件
        that.markerClusterer= null;

      //初始化map
      that.map = new that.Map(dom, {
        'zoom': reInitZoom || 16,//初始化地图缩放级别。
        'center': new that.LatLng(latitude, longitude),//初始化地图中心坐标。
        'mapTypeId':"roadmap" //地图类型ID。
      });
      if(locationFlag){
        new that.Marker({
          icon: that.icon('../images/center.gif', [24, 24], [0, 0], [6, 6]),
          map: that.map,
          position: that.map.getCenter()
        });
      }
      new that.Marker({
        icon: that.icon('../images/center.gif', [24, 24], [0, 0], [6, 6]),
        map: that.map,
        position: that.map.getCenter()
      });
    },
    mapEvent () {
      var that = this;
      that.Event.addListener(that.markerClusterer, 'clusterclick', function (evt) {
        // writeLog("mouse event", eventType);
        var ss =  evt;
        // alert('点击了聚合点');
      });

      var read = ()=>  {
        if(!that.thatMarker) return;
        that.thatMarker.setIcon(that.icon('../images/marker.png', [26, 35], [0, 0], [13, 35]));
        that.$refs.footer.removeClass('slideInUp').addClass('slideOutDown');
      };
      that.Event.addListener(that.map, 'click', function() {
        read();
      });
      that.Event.addListener(that.map, 'dragstart', function() {
        read();
      });
      $("header").tap(function() {
        read();
      });
    },
    icon (src, size, origin, anchor){
      var size = new qq.maps.Size(size[0], size[1]),//size是图标尺寸，该尺寸为显示图标的实际尺寸
        anchor = new qq.maps.Point(anchor[0], anchor[1]),//anchor是锚点坐标，描述经纬度点对应图标中的位置
        origin = new qq.maps.Point(origin[0], origin[1]);//origin是切图坐标，该坐标是相对于图片左上角默认为（0,0）的相对像素坐标
      return new qq.maps.MarkerImage(src, size, origin, anchor);
    },
    createCluster (data) {
      var that = this;
      data.forEach((element, index, array) =>{
        (function(n){
          var latLng = new that.LatLng(element[0], element[1]);
          var marker = new that.Marker({ position: latLng, map: that.map});
          that.markers.push(marker);
          that.Event.addListener(marker, 'click', function() {
            marker.setIcon(that.icon("../images/selected.png",[26, 35],[0,0],[13,35]));
            that.map.panTo(latLng);
            // console.log('这是第 ' + n + ' 个标注');
            that.thatMarker = marker;
            getResult('api/house/houseQueryByExacttitude', {lat: element[0], lt: element[1]}, 'callbackExacttitudeHandler',true)
          });
        })(index);
      });

      that.markerClusterer = new that.MarkerCluster({
        map: that.map,
        minimumClusterSize:2, //默认2
        markers: that.markers,
        zoomOnClick:true, //默认为true
        gridSize:30, //默认60
        averageCenter:true, //默认false
        maxZoom:18, //默认18
      });

      that.mapEvent();
    }
  },
  created: function () {
    this.init()
  }
}
</script>

<style scoped>
    .wrap-page{
        -webkit-transform: scale(1.5) translateZ(0px) !important;
    }
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
        font-size: 24px;
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
        font-size: 20px;
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
