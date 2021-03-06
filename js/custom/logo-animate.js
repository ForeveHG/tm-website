$(function (o, c, a, m, k, n) {
    var e = a(".menu-main-menu"),
        l = a(".top"),
        b = a(o),
        j = a(".site-navigation").innerHeight(),
        f = a(".owl-item"),
        d = f.find(".featured-image"),
        g = a(".owl-controls");

    function h() {
        var A = 58,
            w = "",
            s = a("#intro"),
            y = a("#slogan", s),
            u = a("#logo-holder", s),
            v = u.height();

        function p() {
            m.set(".particle", {
                autoAlpha: 0
            });
            m.allTo(u.find("div"), 2, {
                autoAlpha: 1,
                top: 0,
                delay: 0.5,
                ease: Power1.easeOut,
                onComplete: function () {
                    m.to(y, 1.5, {
                        autoAlpha: 1,
                        onComplete: function () {
                            var B = new k();
                            B.to(u, 1, {
                                autoAlpha: 0
                            }).to(y, 0.75, {
                                autoAlpha: 0
                            }, "-=1").to(s, 1, {
                                autoAlpha: 0
                            })
                        }
                    })
                }
            }, 0.03)
        }
        for (var q = 0; q < A; q++) {
            var x = Math.floor(Math.random() * 3000),
                t = q * 8,
                r = -t,
                z = (q % 2 === 0) ? b.height() + (v + x) : -(b.height() + x);
            w += '<div class="particle" style="left: ' + t + "px;top:" + z + "px;background-position:" + r + 'px 0px"></div>'
        }
        m.set(u, {
            top: (b.height() - v) / 2
        });
        m.set(y, {
            top: (b.height() - v) / 2
        });
        u.append(w);
        p()
    }

    function i() {
        var q = b.width(),
            p = b.height() - j;
        o.draft.utils.log("width:" + q + "  |  height: " + p);
        f.css({
            width: q,
            height: p
        });
        d.width(q).height(p);
        g.css({
            left: (q - g.outerWidth()) / 2
        })
    }
    b.on("resize", _.throttle(function () {
        draft.utils.setResponsiveImages(a("body")).waitForImages(function () {
            i()
        })
    }, 100));
    a(".enter-button").on("click", function (p) {
        p.preventDefault();
        m.set(".site-navigation", {
            top: "-" + a(".site-navigation").outerHeight() + "px"
        });
        m.set(".current-page", {
            marginTop: "-" + o.innerHeight + "px"
        });
        m.to(".current-page", 1, {
            marginTop: "0px",
            ease: Expo.easeInOut
        });
        m.to(".site-navigation", 1, {
            top: o.innerHeight - a(".site-navigation").outerHeight(),
            ease: Expo.easeInOut,
            onComplete: function () {
                a(".site-navigation").css({
                    bottom: 0,
                    top: "auto"
                })
            }
        })
    });
    a(".continue").on("click", function (p) {
        p.preventDefault();
        l.show()
    });
    e.addClass("home");
    a(".site-navigation").addClass("home").css("bottom", "0px").css("top", "auto");
    a(".logo").addClass("home");
    o.draft.utils.setResponsiveImages(a("body"));
    if (a("#intro").length) {
        h()
    }
    i()
}(window, document, jQuery, TweenMax, TimelineMax));