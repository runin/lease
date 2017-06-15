(function($){
	H.index = {
		more: [],
		block: new Map(),
		search: {},
		nomoreTips: '没有更多结果了',
		moreTips: '查看更多&gt;&gt;',
		init: function() {
			this.event();
			if(W.userUuid && W.userPassword) $(".btn-login span").text('个人中心');
			this.getCity();
		},
		getCity: function() {
            //
			var _this = this;
			this.search['page'] = 1;
			this.search['pageSize'] = 10;
			var geocoder = new qq.maps.Geocoder({
				complete : function(result){
					$.ajax({
						type: 'GET',
						async: false,
						url: domain_url + 'api/house/houseArea' + dev,
						data: { cn: encodeURIComponent(result.detail.addressComponents.city) },
						dataType: "jsonp",
						jsonpCallback: 'callbackQueryHouseVillageHandler',
						timeout: 5e3,
						complete: function() {
						},
						success: function(data) {
							if (data.code === 0 && data.list) {
								_this.block = formatMap(data.list, 'vn');
								_this.search['cc'] = data.list[0].cc;
								saveData('cityCode', data.list[0].cc);
								$('#rssinfo').remove();
								$('#optionlist').prepend('<div class="rssinfo menunav-info moreinfo" id="rssinfo"><div class="regioninfo" id="regioninfo" data-type="blockinfo"><ul class="regionlist" id="regionlist"><li class="high highinit">不限</li></ul></div></div>');
								var rss = formatMap(data.list, ['an', 'ac'], ';');
								var t = simpleTpl();
								rss.forEach((value, key) => {
									var info = key.split(';');
									$('#regionlist').append('<li data-id="' + info[1] + '">' + info[0] + '</li>')

                                    t._('<div class="blockinfo" id="blockinfo-' + info[1] + '"><div class="blocklist"><a href="javascript:;" class="high highinit">不限</a>')
										for(let city of value){
											t._('<a href="javascript:;" data-id="' + city.ui + '">' + city.vn + '</a>')
										}
									t._('</div></div>')
								});
								$('#rssinfo').append(t.toString());
								_this.getRoom(1);
							} else {
								for (var i in iosCitys) {
									if (iosCitys[i].value == result.detail.addressComponents.city) {
										_this.search['cc'] = iosCitys[i].id;
										saveData('cityCode', iosCitys[i].id);
										_this.getRoom(1);
										return;
									}
								}
							}
						},
						error: function(xmlHttpRequest, error) {
							_this.search['cc'] = cityCode;
							_this.getRoom(1);
						}
					});
				}
			});
			var latLng = new qq.maps.LatLng(latitude, longitude);
			geocoder.getAddress(latLng);
		},
		event: function() {
			var _this = this;
			$("body").delegate(".btn-gotop", "touchend", function(e){
				e.preventDefault();
				$('.wrap-page').scrollTop(0);
			}).delegate(".btn-map", "touchend", function(e){
				e.preventDefault();
				toUrl(jumpUrl + "look-housing-map/look-housing-map.html");
			}).delegate(".btn-login", "touchend", function(e){
				e.preventDefault();
				(W.userUuid && W.userPassword) ? toUrl(jumpUrl +'user/user.html') : toUrl(jumpUrl +'login/login.html');
			}).delegate("#menunav span", "touchend", function(e){
				e.preventDefault();
				$('.menunav-info').hide();
				$('#optionlist, .coverMask').show();
				$('#' + $(this).attr('id') + 'info').show();
			}).delegate(".coverMask", "touchend", function(e){
				e.preventDefault();
				$('#optionlist, .menunav-info, .coverMask').hide();
			}).delegate(".btn-more", "touchend", function(e){
				e.preventDefault();
				if (!$(this).hasClass('nomore')) _this.getRoom(_this.search.page, true);
			}).delegate("#moreinfo li", "touchend", function(e){
				e.preventDefault();
				$('#moreinfo .blockinfo').hide();
				$('#' + $(this).attr('data-type')).show();
			}).delegate("#rssinfo li", "touchend", function(e){
                // 行政区列表点击
				e.preventDefault();
				$('#rssinfo li').removeClass('high');
				$(this).addClass('high');
				$('#rssinfo .blockinfo').hide();

				var id = $(this).attr('data-id');
				if (id) {
					_this.search['ac'] = id;
					$('#rss b').html($(this).html());

					if ($('#blockinfo-' + id).length > 0) {
						$('#blockinfo-' + id).show();
					} else {
						_this.getRoom(1);
						isNavLoad = true;
					}
				} else {
					delete _this.search['ac'];
					delete _this.search['vn'];
					$('#rss b').html('区域');

					$('#rssinfo a').removeClass('high');
					$('#rssinfo .highinit').addClass('high');
					_this.getRoom(1);
					isNavLoad = true;
				}
			}).delegate("#rssinfo a", "touchend", function(e){
                // 行政区下的村点击
				e.preventDefault();
				$('#rssinfo a').removeClass('high');
				$('#rssinfo a.highinit').addClass('high');
				$(this).siblings('.highinit').removeClass('high');
				$(this).addClass('high');

				var id = $(this).attr('data-id');
				if (id) {
					_this.search['vn'] = encodeURIComponent($(this).html());
					$('#rss b').html($(this).html());
				} else {
					delete _this.search['vn'];
					$('#rss b').html($('#rssinfo li[data-id="' + $(this).parents('.blockinfo').attr('id').slice(10) + '"]').html());
				}
				_this.getRoom(1);
				isNavLoad = true;
			}).delegate("#priceinfo a", "touchend", function(e){
                // 价格条件选择
				e.preventDefault();
				$('#priceinfo a').removeClass('high');
				$(this).addClass('high');
				var lp = $(this).attr('data-lp') || '';
				var hp = $(this).attr('data-hp') || '';
				if (lp && hp) {
					_this.search['lp'] = lp;
					_this.search['hp'] = hp;
					$('#price b').html($(this).html());
				} else {
					delete _this.search['lp'];
					delete _this.search['hp'];
					$('#price b').html('价格');
				}
				_this.getRoom(1);
				isNavLoad = true;
			}).delegate(".btn-submit", "touchend", function(e){
                // 自定义价格
                e.preventDefault();
                var reg = /^[0-9]*$/;
                var min = $.trim($('input[name="min"]').val()) * 1;
                var max = $.trim($('input[name="max"]').val()) * 1;
                if (min && max && min <= max && reg.test(min) && reg.test(max)) {
                    $('#price b').html('自定义');
                    _this.search['lp'] = min;
                    _this.search['hp'] = max;
                    _this.getRoom(1);
                    isNavLoad = true;
                } else {
                    $('#price b').html('价格');
                    delete _this.search['lp'];
                    delete _this.search['hp'];
                    showTips('请检查输入是否有误');
                }
            }).delegate("#moreinfo a", "touchend", function(e){
				e.preventDefault();
				$(this).parent('.blocklist').find('a').removeClass('high');
				$(this).addClass('high');
				var id = $(this).parents('.blockinfo').attr('id');
				var data = $(this).attr('data') || '';
				var mark = (id == 'rt') ? '0' : ( (id == 'ht') ? '1' : '2' );
				if (data) {
					_this.search[id] = data;
					_this.more[mark] = $(this).html();
					$('li[data-type="' + id + '"]').addClass('high');
				} else {
					delete _this.search[id];
					delete _this.more[mark];
					$('li[data-type="' + id + '"]').removeClass('high');
				}
				_this.getRoom(1);
				isNavLoad = true;
			}).delegate(".btn-so", "touchend", function(e){
                // 搜索按钮
				e.preventDefault();
				var content = $.trim($('input[name="search"]').val());
				$('#rssinfo li, #rssinfo a').removeClass('high');
				$('#rssinfo .highinit').addClass('high');
				$('#rss b').html('区域');
				if (content && content.length > 0) {
					_this.search['vn'] = content;
					_this.getRoom(1);
					isNavLoad = true;
				} else {
					showTips('请检查输入是否有误');
				}
			}).delegate(".list", "touchend", function(e){
				e.preventDefault();
				toUrl(jumpUrl +'housing-details/housing-details.html?uuid=' + $(this).attr("data-id"));
			});

			// 置顶
			document.getElementById("wrap-page").addEventListener("scroll", function(){
				if ($('.wrap-page').scrollTop() > 15e2) $('.btn-gotop').show(); else $('.btn-gotop').hide();
			});
		},
        // 房屋搜索
        // @page    第几页，默认1
        // @more    是追加数据还是覆盖原有数据
		getRoom: function(page, more) {
			var _this = this;
			shownewLoading(null, '查询中...');
			$('.coverMask').trigger('touchend');
			this.search['page'] = page || this.search['page'];
			// if ($('input[name="search"]').val() != decodeURIComponent(this.search.vn)) $('input[name="search"]').val('');
			$('#more b').html(!this.more[0] && !this.more[1] && !this.more[2] ? '更多' : this.more.join(' '));
			$.ajax({
				type: 'GET',
				async: false,
				url: domain_url + 'api/house/houseQuery' + dev,
				data: _this.search,
				dataType: "jsonp",
				jsonpCallback: 'callbackQueryHouseHandler',
				timeout: 5e3,
				complete: function() {
					hidenewLoading();
					$('input[name="search"]').blur();
				},
				success: function(data) {
					if (data.code === 0 && data.list) {
						_this.showResult(data.list, more);
					} else {
						_this.showResult(null, more);
					}
				},
				error: function(xmlHttpRequest, error) {
					$('.btn-more').addClass('nomore').html(this.nomoreTips).show();
				}
			});
		},
		showResult: function(data, isAppend) {
			if (data) {
				var tpl = '';
				for(i in data) {
					tpl += '<div class="list" data-id="' + data[i].hid + '"><img src="' + (data[i].img || './images/default.png') + '"><p>' + data[i].di + '</p><b>' + this.translateRoom(data[i].ht) + (data[i].rt == 0 ? '整租' : '合租') + '</b><i>' + data[i].rent + '/月</i></div>';
				}
				$('.empty').hide();
				if (isAppend) {
					$('.lists').append(tpl).show();
				} else {
					$('.lists').html(tpl).show();
				}
				if ($('.list').length == this.search.pageSize * this.search.page) {
					this.search.page++;
					$('.btn-more').removeClass('nomore').html(this.moreTips).show();
				} else {
					$('.btn-more').addClass('nomore').html(this.nomoreTips).show();
				}
			} else {
				if (isAppend && $('.list').length > 0) {
					$('.btn-more').addClass('nomore').html(this.nomoreTips).show();
				} else {
					$('.empty').show();
					$('.lists, .btn-more').hide();
					$('.btn-more').removeClass('nomore').html(this.moreTips).hide();
				}
			}
		},
		translateRoom: function(data) {
			if (!data) return '';
			var opp = '';
			var ht = data.split('/');
			var room = parseInt(ht[0]) ? `${parseInt(ht[0])}室` : '',
				hall = parseInt(ht[1]) ? `${parseInt(ht[1])}厅` : '',
				kitchen = parseInt(ht[2]) ? `${parseInt(ht[2])}厨` : '',
				toilet = parseInt(ht[3]) ? `${parseInt(ht[3])}卫` : '';
			if ((room + hall + kitchen + toilet).length != 0) opp = ' ';
			return room + hall + kitchen + toilet + opp;
		}
	};
})(Zepto);
$(function(){
	stopTouchendPropagationAfterScroll();
	H.index.init();
	H.jssdk.init();
});