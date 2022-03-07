// document.onkeydown = function(){

//     if(window.event && window.event.keyCode == 123) {
//         alert("F12被禁用,请勿随意查看哦~");
//         event.keyCode=0;
//         event.returnValue=false;
//     }
// }

function showqq() {
    var qq = document.getElementById("qq").innerHTML;
    if (qq != '')
        window.location.href = "tencent://message/?uin=" + qq + "&Site=&Menu=yes";
    else
        alert("博主暂未设置QQ联系方式");
}

// --------------点击按钮显示Aplayer👇--------------
function showAaplayer() {
    var aplayer = $(".aplayer");
    if (aplayer.css("display") == 'block')
        aplayer.fadeOut(200)
    else
        aplayer.fadeIn(200)
}
// --------------点击按钮显示Aplayer👆--------------


//-----------------获取文章阅读热度👇-------------------
function getHotnum() {
    //文章阅读热度（重构，利用leancloud原生api）
    var pl = window.location.pathname;
    if (pl.search("post") == -1)
        return false;
    if (pl[pl.length - 1] != '/')
        pl += '/'
    var ptitle = $("#ptitle").html();
    var rootaddr = $("#rootaddr").html();
    pl = pl.replace(rootaddr, "");
    var appid = '<%= site.customConfig.Leancloud_appId %>';
    var appkey = '<%= site.customConfig.Leancloud_key %>';
    if(AV==undefined)
            AV.init({
                appId: appid,
                appKey: appkey
            });
    avquery = new AV.Query('Counter');
    avquery.equalTo('url', pl);
    var time = 'Loading...';
    avquery.find().then(function (results) {
        if (results.length == 0) {
            var NewCounter = AV.Object.extend('Counter');
            var nc = new NewCounter();
            nc.save({
                time: 1,
                title: ptitle,
                url: pl,
                xid: pl,
            }).then(function (object) {
                $(".hotnum").eq(0).html(1);
                $(".hotnum").eq(1).html(1);
            });
        } else {
            id = results[0].id;
            var todo = AV.Object.createWithoutData('Counter', id);
            time = results[0].attributes.time + 1;
            todo.set("time", time);
            todo.save();
            $(".hotnum").eq(0).html(time);
            $(".hotnum").eq(1).html(time);
        }

    }, function (error) {
        console.log(error)
    });
}
//-----------------获取文章阅读热度👆-------------------

//loading加载关闭
function pjaxloadingClose() {
    var pjaxloading = $(".pjaxloading");
    pjaxloading.hide();
}


//图片懒加载功能初始化（为图片添加标签 +同时为fancybox添加功能
function imglazyloadinit() {
    var img = $("img");
    for (var i = 0; i < img.length; i++) {
        if (img.eq(i).attr("class") == undefined) {
            img.eq(i).attr("class", "lazyload");
            var imgsrc = img.eq(i).attr("src");
            img.eq(i).attr("data-original", imgsrc);
            img.eq(i).addClass("imgloading");
            img.eq(i).attr("src", "/media/images/imgloading.gif");
            var parent = "<span data-fancybox='images' href='" + imgsrc + "'></span>"
            img.eq(i).wrap(parent);
        }
    }
}


//文章列表图片懒加载功能初始化
function plimglazyloadinit(oclass, nclass) {
    var img = $("img");
    for (var i = 0; i < img.length; i++) {
        console.log(img.eq(i).attr("class"))
        if (img.eq(i).attr("class") == oclass) {
            img.eq(i).addClass("lazyload");
            var imgsrc = img.eq(i).attr("src");
            img.eq(i).attr("data-original", imgsrc);
            img.eq(i).addClass(nclass);
            img.eq(i).attr("src", "/media/images/imgloading.gif");
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function codebtncolorinit(e) {
    await sleep(2000);
    e.trigger.innerHTML = "复制代码"
    e.trigger.style.background = "cornflowerblue"
}

//--------------------代码块初始化------------------------
function codeinit() {
    //寻找所有code标签，加复制按钮鸭！(行内代码除外)
    var codes = document.getElementsByTagName('code');
    if (codes.length) {
        for (var i = 0; i < codes.length; i++) {
            //高度/行高=文本行数
            // var rowNum=Math.round(codes[i].height()/parseFloat(codes[i].css('line-height')));
            // console.log("当前有"+rowNum+"行");
            var code_id = "code_id_" + i;
            codes[i].setAttribute("id", code_id);
            var ci = "#" + code_id;
            var codedot = $(ci);
            var rowNum = Math.round(codedot.height() / parseFloat(codedot.css('line-height')));
            if (rowNum <= 1) continue;
            var btn = document.createElement("button");
            btn.setAttribute("class", "copybt");
            btn.setAttribute("data-clipboard-target", "#" + code_id);
            btn.innerHTML = '复制代码';
            codes[i].parentNode.insertBefore(btn, codes[i]);
        }
    };
    var cop = new ClipboardJS('.copybt');
    cop.on('success', function (e) {
        e.trigger.innerHTML = "复制成功~"
        e.trigger.style.background = "#894e54"
        codebtncolorinit(e)
        e.clearSelection();
    });
    cop.on('error', function (e) {
        alert("矮油，复制失败了...手动复制吧勇士！");
        e.clearSelection();
    });

    //修改code模块css属性
    $(".hljs").css({
        "padding": "20px"
    })
}

//---------------------图片懒加载功能--------------------------
function lazyload() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        var pcmode = 1;
    } else {
        var pcmode = 2;
        imglazyloadinit()
    }
    var oLazyload = $("img.lazyload");
    if (pcmode == 2) {
        fLazyload = function (hLazyload) {
            var nLazyload = $(window).height() + $(document).scrollTop();
            oLazyload.each(function () {
                $(this).offset().top < nLazyload && ($(this).trigger("appear"), oLazyload =
                    oLazyload.not(this));
            }), 0 == oLazyload.length && $(window).unbind("scroll", fLazyload);
        };
        oLazyload.each(function () {
            $(this).one("appear", function () {
                $(this).attr("src", $(this).attr("data-original"));
                $(this).on('load', function () {
                    $(this).removeClass("imgloading");
                });
            });
        })
        $(window).bind("scroll", fLazyload), fLazyload();
    } else {
        oLazyload.each(function () {
            $(this).attr("src", $(this).attr("data-original"));
            $(this).on('load', function () {
                $(this).removeClass("imgloading");
                $(this).attr("src", $(this).attr("data-original"));
            });
        })
    }
}

//-----------------------分享功能👇----------------------------------
function shareInit() {
    var title = document.getElementById("texttitle").getElementsByTagName("h2");
    if (menupos == 'top') {
        var avatarSrc = $(".menutopavatar").attr("src");
        var dp = document.getElementsByClassName("navbar-brand")[1].innerHTML;
    } else {
        var avatarSrc = $(".avatar").attr("src");
        var dp = document.getElementsByClassName("description")[0].innerHTML;
    }
    var share = new Share('.share', {
        title: title[0].innerHTML,
        initialized: true,
        //默认获取网站描述
        description: dp,
        //网站图片默认获取的是设置的用户头像
        image: avatarSrc,
        //激活的分享网站
        sites: ["weibo", "qq", "wechat", "douban", "qzone", "facebook", "twitter", "google"],
        //微信分享PC端会生成二维码分享,移动端如果可以唤起微信最好
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper: '<p>微信里扫一下二维码</p><p>便可将本文分享至朋友圈。</p>',
        //关闭的网站分享
        disabled: ['google', 'linkedin'],
        wechatQrcodePosition: 'bottom'
    });
    //点击分享按钮展现出分享icons
    var sharebtnTag = false;
    $(".sharebtn").click(function () {
        if (!sharebtnTag) {
            $(".share").show();
            sharebtnTag = true;
        } else {
            $(".share").hide();
            sharebtnTag = false;
        }
    })
}
//-----------------------分享功能👆----------------------------------

//---------------------赞赏功能👇---------------------------
function donateInit() {
    var donatebtnTag = false;
    $(".donatebtn").click(function () {
        if (!donatebtnTag) {
            $(".donate").show();
            donatebtnTag = true;
        } else {
            $(".donate").hide();
            donatebtnTag = false;
        }
    })
}
//---------------------赞赏功能👆---------------------------


//------------fog 1.0版本彩蛋😉  👇--------------------------------------
//------------fog 1.0版本彩蛋😉  👆--------------------------------------
