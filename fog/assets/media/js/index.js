   function init() {
        menu = $('.menu');
        side = $('.side');
        main = $('#main');
        postinfo = $('.postinfo');
        postimage = $('.postimage');
        tab1 = document.querySelector("#tab1");
        ClicksideState = 0;
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
            ClicksideState = 1;
        } else {
            side.animate({
                'left': -1200
            });
            ClicksideState = 0;
        }
        (tab1.className == 'tab') ?
        tab1.className = 'tab active':
            tab1.className = 'tab';
    }
    tab1.addEventListener('click', menu_openclose1);
    menu_openclose1();
