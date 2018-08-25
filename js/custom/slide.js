$(function (w) {
    let header = $(".header"),
        content = $(".container"),
        page = $(".page-content"),
        win = $(w),
        $trigger = $(".jsc_smooth_scroll_trigger"),
        $target = $(".jsc_smooth_scroll_target"),
        $page = $(".turn-to-page"),
        $frame = $("#frame-content");
    frame = '<iframe class="main_visual iframe_space" frameborder="0" src=""></iframe>'
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
                if (i && i == "home") {
                    if (page.is(':hidden')) {
                        page.show();
                    }
                    e.scrollToTarget(i)
                } else if (i && "Bottom" == i) {
                    if (isHome()) {
                        // content.css("margin-top","100vh - 58px")
                        setPage("page/banner.html");
                        e.scrollBottom(t.target)
                    } else {
                        content.animate({
                            marginTop: $frame.find("iframe").height()
                        }, 500, "swing", function () {
                            setPage("page/banner.html")
                            header.removeClass("is-fixed")
                            content.css("margin-top","calc(100vh - 58px)")
                            page.show();
                        }), !1
                    }

                }
                // else if (s){
                //     e.scrollToHeader(s)
                //     e.turnToPage(s)
                //     // location.href += '/#' + i
                //     // console.log(location.href)
                // }
                // "Bottom" === i ? e.scrollBottom(t.target) : e.scrollToTarget(i)
            }
        })

        $page.on("click", function (t) {
            if (t.preventDefault(), t.stopPropagation(), !$("body,html").is(":animated")) {
                var s = $(this).data(DATA.PAGE)
                if (s) {
                    e.scrollToHeader(s)
                    e.turnToPage(s)
                    // location.href += '/#' + i
                    // console.log(location.href)
                }
                // "Bottom" === i ? e.scrollBottom(t.target) : e.scrollToTarget(i)
            }
        })

        win.on("load", function () {
            $frame.html(frame)
            var t = location.hash;
            if (t && t !== '#home') {
                var i = t.replace(/#/, "page/") + '.html';
                setPage(i);
                e.loadPage(i);
            } else {
                setPage('page/banner.html')
            }
        })

        win.on("hashchange", function () {
            console.log(location)
            console.log(history)
        })

        window.addEventListener("popstate", function () {
            console.log('返回', history)
        }, false)
    }

    function getHomeTop() {
        return content[0].getBoundingClientRect().top;
    }

    function setPage(page) {
        let f = $frame.find("iframe");
        if (f.attr("src") != page) {
            $frame.html(frame);
            $frame.find("iframe").attr("src", page)
        }
    }

    function isHome() {
        return location.hash == '#home'
    }

    this.scrollToTop = function (e, r) {
        var t = $("html").offset().top;
        return $("body,html").animate({
            scrollTop: t
        }, 500, "swing", function () {
            header.removeClass("is-fixed")
        }), !1
    }

    this.scrollToTarget = function (e) {
        var t, i = this;
        if ($target.each(function () {
                $(this).data(DATA.POINT) === e && (t = $(this).offset().top)
            }), t) return $("body,html").animate({
            scrollTop: t
        }, 500, "swing"), !1
    }

    this.scrollToHeader = function (s) {
        var t, i = this;
        var top = getHomeTop();
        if (top > 0) {
            t = $("html").offset().top
            return content.animate({
                marginTop: t,
            }, 500, "swing"), !1
        } else if (top <= 0) {
            content.css("marginTop", 0);
        }
    }

    this.scrollBottom = function () {

        if (getHomeTop() <= 0) {
            var t = $frame.find("iframe").height();
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
        page.hide();
        $frame.html(frame)
        return $frame.find("iframe").animate({
            top: 58,
        }, 500, "swing", function () {
            $frame.find("iframe").attr("src", s)
        }), !1
    }

    this.loadPage = function (s) {
        page.hide();
        content.css("margin-top", 0)
        $frame.find("iframe").css("top", 58)
    }


}(window))