/**
 * 压缩、上传、预览图片
 */
$.fn.compressUpload = function(options) {
    // 默认参数
    $.fn.compressUpload.defaults = {
        url: '', 		// 图片上传路径
        numLimit: 5,	// 上传图片个数
        formCls: 'upload-form',		// 上传form的class
        encoder: 0.1 //压缩比（0--1之间取值）
    };
    // 初始值继承
    var opts = $.extend({}, $.fn.compressUpload.defaults, options);

    return this.each(function(){

        var $uploadBox = $(this),
            $uploadBtn = $uploadBox.find('.btn-upload'),
            $uploadInput = null;

        //    用于压缩图片的canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        //    瓦片canvas
        var tCanvas = document.createElement("canvas");
        var tctx = tCanvas.getContext("2d");
        var maxsize = 100 * 1024;

        var event = function() {
                $uploadInput = $uploadBox.find('input');
                $uploadBtn.on("click", function() {
                    $uploadInput.trigger('click');
                }).on("touchstart", function() {
                    $(this).addClass("touch")
                }).on("touchend", function() {
                    $(this).removeClass("touch")
                });

                $uploadInput.on('change', function(e) {
                    if($(this).val() != ""){
                        fileSelected();
                    }
                });
                $uploadBox.on('click', '.img-preview', function(e) {
                    e.preventDefault();
                    if ($(e.target).hasClass('close')) {
                        return;
                    }
                    preview($(this).find('img').attr('src'));

                }).on('click', '.close', function(e) {
                    e.preventDefault();

                    $(this).closest('a').remove();
                    $uploadBtn.removeClass('none');
                    $uploadInput.val('');
                });

            },
            fileSelected = function () {
                var $fileUpload = $uploadInput.get(0);
                if (!$fileUpload.files.length) return;
                var files = Array.prototype.slice.call($fileUpload.files);
                if (files.length > 9) {
                    showTips("最多同时只可上传9张图片");
                    return;
                }
                files.forEach(function(file, i) {
                    if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
                    if ($('.img-preview').length >= opts.numLimit - 1) {
                        $uploadBtn.addClass('none');
                    }

                    var reader = new FileReader(),
                        imgId = 'img-' + new Date().getTime(),
                        t = simpleTpl();

                    t._('<a href="#" id="'+ imgId +'" class="img-preview loading" data-collect="true" data-collect-flag="news-baoliao-preview-btn" data-collect-desc="预览图片按钮">')
                        ._('<span class="lc"><i class="uploading"></i></span>')
                        ._('<i class="close"  data-collect="true" data-collect-flag="news-baoliao-remove-img-btn" data-collect-desc="删除上传的图片按钮" data-stoppropagation="true"></i>')
                        ._('<span class="ic"><img /></span>')
                        ._('</a>');

                    $uploadBtn.before(t.toString());

                    reader.onload = function() {
                        var result = this.result;
                        var img = new Image();
                        img.src = result;
                        $('#' + imgId).find('img').attr('src', result);
                        //如果图片大小小于100kb，则直接上传
                        if (result.length <= maxsize) {
                            img = null;
                            upload(result, file.type,  $('#' + imgId));
                            return;
                        }
                        //      图片加载完毕之后进行压缩，然后上传
                        if (img.complete) {
                            var con = confirm("图片过大正在压缩上传中，请耐心等待。若等待时间过长，请重新上传较小图片！");
                            if(con){
                                callback();
                            }else{
                                $('#' + imgId).remove();
                                $uploadBtn.removeClass('none');
                                $uploadInput.val('');
                            }

                        } else {
                            img.onload = callback;
                        }
                        function callback() {

                            var data = compress(img);
                            upload(data, file.type, $('#' + imgId));
                            img = null;
                        }
                    };
                    reader.readAsDataURL(file);
                })
            },
            compress = function(img) {
                var initSize = img.src.length;
                var width = img.width;
                var height = img.height;
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                var ratio;
                if ((ratio = width * height / 4000000) > 1) {
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                //        铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //如果图片像素大于100万则使用瓦片绘制
                var count;
                if ((count = width * height / 1000000) > 1) {
                    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                    //            计算每块瓦片的宽和高
                    var nw = ~~(width / count);
                    var nh = ~~(height / count);
                    tCanvas.width = nw;
                    tCanvas.height = nh;
                    for (var i = 0; i < count; i++) {
                        for (var j = 0; j < count; j++) {
                            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
                }
                //进行最小压缩
                var ndata = canvas.toDataURL('image/jpeg', opts.encoder);
                console.log('压缩前：' + initSize);
                console.log('压缩后：' + ndata.length);
                console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                return ndata;
            },
            //    图片上传，将base64的图片转成二进制对象，塞进formdata上传
            upload = function(basestr, type, $li) {
                var text = window.atob(basestr.split(",")[1]);
                var buffer = new Uint8Array(text.length);
                var pecent = 0, loop = null;
                for (var i = 0; i < text.length; i++) {
                    buffer[i] = text.charCodeAt(i);
                }
                var blob = getBlob([buffer], type);
                var xhr = new XMLHttpRequest();
                var formdata = getFormData();
                formdata.append('file', blob);
                xhr.open('POST', opts.url);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var jsonData = JSON.parse(xhr.responseText);
                        var imagedata = jsonData || {};
                        var text = imagedata.filePath ? '上传成功' : '上传失败';
                        console.log(text + '：' + imagedata.filePath);
                        clearInterval(loop);
                        //当收到该消息时上传完毕
                        $li.find(".progress span").animate({'width': "100%"}, pecent < 95 ? 200 : 0, function() {
                            $(this).html(text);
                        });
                        if (imagedata.filePath) $li.attr('data-url', imagedata.filePath).removeClass('loading');
                    }
                };
                /*//数据发送进度，前50%展示该进度
                xhr.upload.addEventListener('progress', function(e) {
                    if (loop) return;
                    pecent = ~~(100 * e.loaded / e.total) / 2;
                    $li.find(".progress span").css('width', pecent + "%");
                    if (pecent == 50) {
                        mockProgress();
                    }
                }, false);
                //数据后50%用模拟进度
                function mockProgress() {
                    if (loop) return;
                    loop = setInterval(function() {
                        pecent++;
                        $li.find(".progress span").css('width', pecent + "%");
                        if (pecent == 99) {
                            clearInterval(loop);
                        }
                    }, 100)
                }*/
                xhr.send(formdata);
            },
            /**
             * 获取blob对象的兼容性写法
             * @param buffer
             * @param format
             * @returns {*}
             */
            getBlob = function(buffer, format) {
                try {
                    return new Blob(buffer, {type: format});
                } catch (e) {
                    var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
                    buffer.forEach(function(buf) {
                        bb.append(buf);
                    });
                    return bb.getBlob(format);
                }
            },
            /**
             * 获取formdata
             */
            getFormData = function() {
                var isNeedShim = ~navigator.userAgent.indexOf('Android')
                    && ~navigator.vendor.indexOf('Google')
                    && !~navigator.userAgent.indexOf('Chrome')
                    && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
                return isNeedShim ? new FormDataShim() : new FormData()
            },
            /**
             * formdata 补丁, 给不支持formdata上传blob的android机打补丁
             * @constructor
             */
            FormDataShim = function() {
                console.warn('using formdata shim');
                var o = this,
                    parts = [],
                    boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
                    oldSend = XMLHttpRequest.prototype.send;
                this.append = function(name, value, filename) {
                    parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
                    if (value instanceof Blob) {
                        parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                        parts.push(value);
                    }
                    else {
                        parts.push('\r\n\r\n' + value);
                    }
                    parts.push('\r\n');
                };
                // Override XHR send()
                XMLHttpRequest.prototype.send = function(val) {
                    var fr,
                        data,
                        oXHR = this;
                    if (val === o) {
                        // Append the final boundary string
                        parts.push('--' + boundary + '--\r\n');
                        // Create the blob
                        data = getBlob(parts);
                        // Set up and read the blob into an array to be sent
                        fr = new FileReader();
                        fr.onload = function() {
                            oldSend.call(oXHR, fr.result);
                        };
                        fr.onerror = function(err) {
                            throw err;
                        };
                        fr.readAsArrayBuffer(data);
                        // Set the multipart content type and boudary
                        this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                        XMLHttpRequest.prototype.send = oldSend;
                    }
                    else {
                        oldSend.call(this, val);
                    }
                }
            },
            preview = function(src) {
                var t = simpleTpl(),
                    $previewBox = $('.preview-box'),
                    w = $(window).width(),
                    h = $(window).height();

                if ($previewBox.length == 0) {
                    t._('<div class="preview-box">')
                        ._('<img class="none" />')
                        ._('</div>');
                    $previewBox = $(t.toString());
                } else {
                    $previewBox.show();
                }
                imgReady(src, function() {
                    var toW = w - 20,
                        toH = h - 20,
                        toRotate = toW / toH,
                        srcRotate = this.width / this.height;

                    if (this.width > toW || this.height > toH) {
                        if (toRotate <= srcRotate) {
                            toH = toW * (this.height / this.width);
                        } else {
                            toW = toH * (this.width / this.height);
                        }
                    } else {
                        toW = this.width;
                        toH = this.height;
                    }

                    $previewBox.find('img').attr('src', src).css({'width': toW, 'height': toH, 'margin-left': (w - toW) / 2, 'margin-top': (h - toH) / 2}).removeClass('none');
                });

                $('html').addClass('noscroll');
                $('body').append($previewBox).delegate('.preview-box', 'tap', function(e) {
                    $previewBox.hide();
                    $('html').removeClass('noscroll');
                });

            },

            initForm = function() {
                var $uploadForm = $uploadBox.find('.' + opts.formCls);
                if ($uploadForm.length > 0) {
                    return;
                }
                var t = simpleTpl();
                t._('<form class="'+ opts.formCls +'" enctype="multipart/form-data" method="post">')
                    ._('<input type="file" accept="image/*">')
                    ._('</form>');
                $uploadForm = $(t.toString());
                $uploadBox.append($uploadForm);
            };

        initForm();
        event();
    });
};