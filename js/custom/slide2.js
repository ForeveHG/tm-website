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
                    e.scrollHeader()
                    e.turnPage(s)
                }
                if ("contact_us" === i) {
                    // "/" !== location.pathname && (location.href = "/#contact_us")
                }
                "TOP" === i ? e.scrollBottom(t.target) : e.scrollToTarget(i)
            }
        })

        win.on("load", function () {
            var t = location.hash;
            if (t) {
                var i = t.replace(/#/, "");
                e.scrollToTarget(i)
            }
        })
    }

    function getHomeTop() {
        console.log('margin:',content.outerHeight() -content.innerHeight())
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

    this.scrollHeader = function () {
        getHomeTop();
        var t, i = this;
        t = $("html").offset().top
        return content.animate({
            marginTop: t,
        }, 500, "swing"), !1
    }

    this.scrollBottom = function () {
        var t, i = this;
        t = frame.height();
        frame.attr("src", '');
        return content.animate({
            marginTop: t,
        }, 500, "swing", function () {
            frame.attr("src", "page/banner.html").css("margin-top", 0)
            content.css("margin-top", 'calc(100vh - 58px)')
            page.show();
        }), !1
    }

    this.turnPage = function (s) {
        var t, i = this;
        t = $("html").offset().top
        frame.attr("src", '');
        page.hide();
        return frame.animate({
            marginTop: 58,
        }, 500, "swing", function () {
            frame.attr("src", s);
        }), !1
    }
}(window))