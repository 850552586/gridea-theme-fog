// 由于采用了Pjax技术，所以很多js需要在pjax complete后加载。
//回到顶部按钮初始化
function toginit() {
    $(function () {
        $('.toggleContainer').click(function () {
            $('html,body').animate({
                scrollTop: '0px'
            }, 800);
        });
        $(window).scroll(function () {
            var st = $(window).scrollTop();
            if (st > 30) {
                $(".toggleContainer").fadeIn(400);
            } else {
                $(".toggleContainer").fadeOut(100);
            }
        });
    });
}