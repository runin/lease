(function($) {
	H.jssdk = {
		wxIsReady: false,
		loadWXconfig: 5,
		init: function(){
			this.wxConfig();
		},
		wxConfig: function(){
			$.ajax({
				type: 'GET',
				async: true,
				url: domain_url + 'api/mp/jsapiticket' + dev,
				data: {appId: mpappid},
				dataType: "jsonp",
				jsonpCallback: 'callbackJsapiTicketHandler',
				timeout: 1e4,
				complete: function() {
				},
				success: function(data) {
					if(data.code == 0) {
						var url = window.location.href.split('#')[0];
						var nonceStr = 'df51d5cc9bc24d5e86d4ff92a9507361';
						var timestamp = Math.round(new Date().getTime()/1000);
						var signature = hex_sha1('jsapi_ticket=' + data.ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + url);
						wx.config({
							debug: false,
							appId: mpappid,
							timestamp: timestamp,
							nonceStr:nonceStr,
							signature:signature,
							jsApiList: [
								'startRecord',
								'stopRecord',
								'onVoiceRecordEnd',
								'playVoice',
								'stopVoice',
								'pauseVoice',
								'onVoicePlayEnd',
								'uploadVoice',
								'downloadVoice',
								'onMenuShareTimeline',
								'onMenuShareAppMessage',
								'hideAllNonBaseMenuItem',
								'onMenuShareQQ',
								'onMenuShareWeibo',
								'hideMenuItems',
								'showMenuItems',
								'hideOptionMenu',
								'showOptionMenu',
								'addCard',
								'getLocation',
								'openLocation'
							]
						});
					}
				},
				error: function(xmlHttpRequest, error) {
				}
			});
		},
		menuShare: function() {
			var me = this;
			wx.onMenuShareTimeline({
				title: shareData.title,
				desc: shareData.desc,
				link: shareData.link,
				imgUrl: shareData.imgUrl,
				trigger: function(res) {
				},
				success: function(res) {
					me.shareSuccess();
				},
				cancel: function(res) {
					me.shareFail();
				},
				fail: function(res) {
					me.shareFail();
				}
			});
		},
		menuToFriend: function() {
			var me = this;
			wx.onMenuShareAppMessage({
				title: shareData.title,
				desc: shareData.desc,
				link: shareData.link,
				imgUrl: shareData.imgUrl,
				success: function(res) {
					me.shareSuccess();
				},
				cancel: function(res) {
					me.shareFail();
				},
				fail: function(res) {
					me.shareFail();
				}
			});
		},
		hideMenuList: function() {
			wx.hideMenuItems({
				menuList: [
					"menuItem:share:timeline",
					"menuItem:share:qq",
					"menuItem:copyUrl",
					"menuItem:openWithQQBrowser",
					"menuItem:openWithSafari",
					"menuItem:share:email"
				],
				success:function (res) {
				},
				fail:function (res) {
				}
			});
		},
		showMenuList: function() {
			wx.showMenuItems({
				menuList: [
					"menuItem:share:appMessage",
					"menuItem:share:timeline",
					"menuItem:favorite",
					"menuItem:copyUrl",
					"menuItem:share:email"
				],
				success:function (res) {
				},
				fail:function (res) {
				}
			});
		},
		shareSuccess: function() {},
		shareFail: function() {},
		mainInit: function() {
			if(/publish\.html/i.test(location.href) && !getQueryString('latng')) {
				H.publishOne.latng = latitude +','+longitude;
				$(".lng-lat").val(H.publishOne.latng);
			}
					
			if(/index\.html/i.test(location.href)) {
				var geocoder = new qq.maps.Geocoder({
					complete : function(result) {
						var nowCityCode = '';
						for (var i in iosCitys) {
							if (iosCitys[i].value == result.detail.addressComponents.city) nowCityCode = iosCitys[i].id;
						}
						if (locationFlag && !isNavLoad && nowCityCode != getData('cityCode')) {
							swal({
								title: "<p class='alert-title'>发现最新位置是否获取房源?</p>",
								showCancelButton: true,
								confirmButtonColor: "#FF5001",
								confirmButtonText: "是",
								cancelButtonText: "否",
								closeOnConfirm: true,
								html: true
							},
							function(isConfirm){
								if (isConfirm) {
									H.index.getCity();
								}
							});
						}
					}
				});
				var latLng = new qq.maps.LatLng(latitude, longitude);
				geocoder.getAddress(latLng);
			}
			if(/look-housing-map\.html/i.test(location.href)) H.lookHousingMap.getMap();
		},
		getLocation: function () {
			var _this = this;
			wx.getLocation({
				type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				complete: function(){},
				success: function (res) {
					latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					/*var speed = res.speed; // 速度，以米/每秒计
					var accuracy = res.accuracy; // 位置精度*/
					saveData("latitude",latitude);
					saveData("longitude",longitude);
					locationFlag = true;
					_this.mainInit();
				},
				fail: function (res) {
					// showTips('定位失败,请检查网络GPS是否开启')
					locationFlag = false;
					_this.mainInit();
				}
			});
		}
	};
})(Zepto);

$(function() {
	wx.ready(function () {
		wx.checkJsApi({
			jsApiList: [
				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd',
				'playVoice',
				'pauseVoice',
				'stopVoice',
				'onVoicePlayEnd',
				'uploadVoice',
				'downloadVoice',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'hideAllNonBaseMenuItem',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'hideMenuItems',
				'showMenuItems',
				'hideOptionMenu',
				'showOptionMenu',
				'addCard',
				'getLocation',
				'openLocation'
			],
			success: function (res) {
				shareData.link = getUrl(openid);
				H.jssdk.wxIsReady = true;
				H.jssdk.menuShare();
				H.jssdk.menuToFriend();

				if (/(index|publish|look-housing-map|rent-reference)\.html/i.test(location.href)) {
					hidenewLoading();
					H.jssdk.getLocation();
				}
			}
		});

		//wx.config成功
	});
	wx.error(function(res){
		H.jssdk.wxIsReady = false;
		if (H.jssdk.loadWXconfig != 0) {
			setTimeout(function(){
				H.jssdk.loadWXconfig--;
				H.jssdk.init();
			}, 5e3);
		}
	});
});
