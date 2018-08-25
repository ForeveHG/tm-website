$(function (l, c, a, i) {
    var b = 0,
        f = 0,
        d = a("#featured-wrapper"),
        k, e = l.draft.utils.isiPad,
        j = a(".video-placeholder");
    a.fn.randomize = function (m) {
        return this.each(function () {
            var n = a(this);
            var o = n.children(m);
            o.sort(function () {
                return (Math.round(Math.random()) - 0.8)
            });
            n.remove(m);
            for (var p = 0; p < o.length; p++) {
                n.append(o[p])
            }
        })
    };
    d.randomize("div.featured");
    d.owlCarousel({
        item: 1,
        navigation: false,
        slideSpeed: 400,
        autoPlay: true,
        loop:true,
        paginationSpeed: 400,
        lazyFollow: false,
        lazyEffect: "fade",
        singleItem: true,
        afterInit: function () {
            var m = this;
            a(".owl-pagination .owl-page").one("click", function () {
                m.stop()
            })
        },
        afterAction: function () {
            b = this.owl.currentItem;
            f = this.prevItem;
            a(".owl-page").html("<div><span></span></div>")
        },
        afterMove: function () {
            if (!e) {
                TweenMax.set(".top-container", {
                    opacity: 0,
                    left: (b < f) ? "100%" : "-100%"
                });
                TweenMax.to(".top-container", 0.8, {
                    opacity: 1,
                    left: "0",
                    ease: Quart.easeOut
                })
            }
        }
    });
    draft.objectContainer.carousel = d.data("owlCarousel");

    function g() {
        k = new TimelineMax({
            onReverseComplete: h
        });
        k.to(".top", 1, {
            marginTop: l.innerHeight,
            ease: Power3.easeInOut
        });
        k.to(".site-navigation", 1, {
            bottom: -l.innerHeight,
            ease: Power3.easeInOut
        }, "-=1");
        k.to(".bottom", 0, {
            top: -l.innerHeight,
            autoAlpha: 1
        }, "-=1");
        k.to(".bottom", 1, {
            top: 0,
            ease: Power3.easeInOut,
            onComplete: function () {
                transition_in_progress = false
            }
        }, "-=1")
    }
    a(".watch-ad").on("click", function (m) {
        m.preventDefault();
        if (!k) {
            g()
        }
        a(".bottom").insertAfter(".top").show();
        j.html('<iframe src="' + a(this).attr("href").replace("//vimeo.com", "//player.vimeo.com").replace("//www.vimeo.com", "//player.vimeo.com") + '?title=0&byline=0&portrait=0&color=ff4242&autoplay=1" width="' + a(l).width() + '" height="' + a(l).height() + '" frameborder="0" autoplay webkitallowfullscreen mozallowfullscreen allowfullscreen title="0" badge="0"></iframe>');
        k.play()
    });
    a(".close").on("click", function (m) {
        m.preventDefault();
        k.reverse()
    });

    function h() {
        j.html("")
    }
    d.on("mouseover", function () {
        var n = d.find(".owl-buttons");
        a(n).children().addClass("featurearrows");
        var m = a(".featureArrows");
        a(m).click(function (p) {
            var o = a(p.currentTarget);
            a(o).css("background-size", "25px 40px")
        })
    })
}(window, document, jQuery));