   function init() {
        menu = $('.menu');
        side = $('.side');
        main = $('#main');
        var bg = $('#bg');
        var bgurl = document.getElementById("bgurl").innerHTML;
        for (var i = 0; i < 3; i++)
            bgurl = bgurl.replace("\\", "/");
        bg.css("background", "url('" + bgurl + "')");
        postinfo = $('.postinfo');
        postimage = $('.postimage');
        tab1 = document.querySelector("#tab1");
        ClicksideState = 0;
        ClickbarState = 0;
        maindom = document.querySelector('#main')
        mainstyle = window.getComputedStyle(maindom, null)
        mainleft = mainstyle.left;
        posttitle = $('.posttitle');
        posttitle2 = $('.posttitlewithoutimg');
    }
    init();
    function menu_openclose1() {
        if (ClicksideState == 0) {
            side.animate({
                'left': 0
            });
            main.css('width', '60%');
            postimage.css('width', '100%');
            postinfo.css('margin-left', '0%');
            posttitle.css('margin-left', '0');
            posttitle2.css('margin-left', '0');
            main.animate({
                'left': mainleft
            })
            ClicksideState = 1;
        } else {
            side.animate({
                'left': -1200
            });
            main.css('width', '100%');
            postimage.css('width', '60%');
            postinfo.css('margin-left', '20%');
            posttitle.css('margin-left', '20%');
            posttitle2.css('margin-left', '20%');
            main.animate({
                'left': 0
            })
            ClicksideState = 0;
        }
        (tab1.className == 'tab') ?
        tab1.className = 'tab active':
            tab1.className = 'tab';
    }
    tab1.addEventListener('click', menu_openclose1);
    menu_openclose1();
