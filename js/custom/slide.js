$(function (w) {
    let header = $(".header"),
        content = $(".container"),
        frame = $(".iframe_space"),
        page = $(".page-content")
    win = $(w),
        $trigger = $(".jsc_smooth_scroll_trigger"),
        $target = $(".jsc_smooth_scroll_target"),
        DATA = {
            TARGET: "smooth_scroll-target",
            POINT: "smooth_scroll-point",
            PAGE: "page-url",
        };

    win.on("scroll", function (e) {
        this.offsetTop = content[0].getBoundingClientRect().top
        this.offsetTop <= 0 ?
            header.addClass(" is-fixed") :
            header.removeClass("is-fixed")
    })

    bindEvent(this);

    function bindEvent(_this) {
        var e = _this;
        $trigger.on("click", function (t) {
            if (t.preventDefault(), t.stopPropagation(), !$("body,html").is(":animated")) {
                var i = $(this).data(DATA.TARGET);
                var s = $(this).data(DATA.PAGE)
                if ("page" == i) {
                    e.scrollToHeader()
                    e.turnToPage(s)
                    let reg = /page\/(.*)\.html/
                    reg.test(s)
                    location.href = '/#' + RegExp.$1
                }
                "Bottom" === i ? e.scrollBottom(t.target) : e.scrollToTarget(i)
            }
        })

        win.on("load", function () {
            frame.attr("src", '');
            var t = location.hash;
            if (t) {
                var i = t.replace(/#/, "page/") + '.html';
                e.loadPage(i)
            } else {
                frame.attr('src', 'page/banner.html')
            }
        })
    }

    function getHomeTop() {
        return content[0].getBoundingClientRect().top;
    }

    this.scrollToTop = function (e, r) {
        var t = $("html").offset().top;
        return $("body,html").animate({
            scrollTop: t
        }, 500, "swing"), !1
    }

    this.scrollToTarget = function (e) {
        var t, i = this;
        if ($target.each(function () {
                $(this).data(DATA.POINT) === e && (t = $(this).offset().top)
            }), t) return $("body,html").animate({
            scrollTop: t
        }, 500, "swing"), !1
    }

    this.scrollToHeader = function () {
        var t, i = this;
        var top = getHomeTop();
        if (top > 0) {
            t = $("html").offset().top
            return content.animate({
                marginTop: t,
            }, 500, "swing"), !1
        } else if (top <= 0) {
            content.css("marginTop", 0)
        }
    }

    this.scrollBottom = function () {
        if (getHomeTop() <= 0) {
            var t = frame.height();
            header.removeClass("is-fixed")
            return this.scrollToTop();
            // return content.animate({
            //     marginTop: t,
            // }, 500, "swing", function () {
            //     location.hash = ''
            //     frame.attr("src", "page/banner.html").css("top", 0)
            //     content.css("margin-top", 'calc(100vh - 58px)')
            //     page.show();
            // }), !1
        }
    }

    this.turnToPage = function (s) {
        var t, i = this;
        frame.attr("src", s);
        frame.css("opacity",0);
        page.hide();
        return frame.animate({
            scrollTop: 58,
            opacity: 1,
        }, 500, "swing", function () {
            
        }), !1
    }

    this.loadPage = function (s) {
        frame.attr("src", s);
        page.hide();
        content.css("margin-top", 0)
        frame.css("top", 58)
    }


}(window))