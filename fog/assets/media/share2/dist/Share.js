!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).Share = e()
}(this, function () {
    "use strict";
    var i = function () {
        return (i = Object.assign || function (t) {
            for (var e, i = arguments, n = 1, o = arguments.length; n < o; n++) for (var r in e = i[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t
        }).apply(this, arguments)
    };

    function t(t) {
        var e = document.getElementsByName(t)[0];
        return e ? e.content : ""
    }

    var e, n = {
        url: location.href,
        origin: location.origin,
        source: t("site") || t("Site") || document.title,
        summary: "",
        title: t("title") || t("Title") || document.title,
        description: t("description") || t("Description"),
        image: (e = document.images[0]) ? e.src : "",
        imageSelector: "",
        weiboKey: "",
        wechatQrcodeTitle: "微信扫一扫：分享",
        wechatQrcodeHelper: "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>",
        wechatQrcodePosition: "top",
        wechatQrcodeSize: 100,
        sites: ["weibo", "qq", "wechat", "douban", "qzone", "linkedin", "facebook", "twitter", "google"],
        mobileSites: [],
        disabled: [],
        initialized: !1,
        mode: ""
    }, a = {
        qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc=&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}",
        qq: 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc=&pics={{IMAGE}}&summary="{{SUMMARY}}"',
        weibo: "https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}",
        wechat: "javascript:",
        douban: "http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11",
        linkedin: "http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin",
        facebook: "https://www.facebook.com/sharer/sharer.php?u={{URL}}",
        twitter: "https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}",
        google: "https://plus.google.com/share?url={{URL}}"
    };

    function o(t, e) {
        void 0 === t && (t = ".custom-share"), void 0 === e && (e = {}), this.isWx = /MicroMessenger/i.test(navigator.userAgent), this.isMobile = document.documentElement.clientWidth <= 768, this.el = this.getRoot(t), this.config = i(i({}, n), e), this.createIcons(), this.createWechat()
    }

    return function (t) {
        if (t && "undefined" != typeof window) {
            var e = document.createElement("style");
            e.setAttribute("media", "screen"), e.innerHTML = t, document.head.appendChild(e)
        }
    }(".icon {\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.15em;\n  fill: currentColor;\n  overflow: hidden;\n}\n.share-item {\n  display: inline-block;\n  vertical-align: top;\n  margin-right: 10px;\n}\n.share-item .icon {\n  font-size: 30px;\n}\n.wechat {\n  position: relative;\n  color: #7bc549;\n  border-color: #7bc549;\n}\n.wechat .wechat-qrcode {\n  display: none;\n  border: 1px solid #eee;\n  position: absolute;\n  z-index: 9;\n  top: -205px;\n  left: -84px;\n  width: 200px;\n  height: 192px;\n  color: #666;\n  font-size: 12px;\n  text-align: center;\n  background-color: #fff;\n  box-shadow: 0 2px 10px #aaa;\n  transition: all 200ms;\n  -webkit-tansition: all 350ms;\n  -moz-transition: all 350ms;\n}\n.wechat .wechat-qrcode.bottom {\n  top: 40px;\n  left: -84px;\n}\n.wechat .wechat-qrcode.bottom:after {\n  display: none;\n}\n.wechat .wechat-qrcode h4 {\n  font-weight: normal;\n  height: 26px;\n  line-height: 26px;\n  font-size: 12px;\n  background-color: #f3f3f3;\n  margin: 0;\n  padding: 0;\n  color: #777;\n}\n.wechat .wechat-qrcode .qrcode {\n  width: 105px;\n  margin: 10px auto;\n}\n.wechat .wechat-qrcode .qrcode table {\n  margin: 0 !important;\n}\n.wechat .wechat-qrcode .help p {\n  font-weight: normal;\n  line-height: 16px;\n  padding: 0;\n  margin: 0;\n}\n.wechat .wechat-qrcode:after {\n  content: '';\n  position: absolute;\n  left: 50%;\n  margin-left: -6px;\n  bottom: -13px;\n  width: 0;\n  height: 0;\n  border-width: 8px 6px 6px 6px;\n  border-style: solid;\n  border-color: #fff transparent transparent transparent;\n}\n.wechat:hover .wechat-qrcode {\n  display: block;\n}\n"), function () {
        function i(t) {
            this.mode = r.MODE_8BIT_BYTE, this.data = t, this.parsedData = [];
            for (var e = 0, i = this.data.length; e < i; e++) {
                var n = [], o = this.data.charCodeAt(e);
                65536 < o ? (n[0] = 240 | (1835008 & o) >>> 18, n[1] = 128 | (258048 & o) >>> 12, n[2] = 128 | (4032 & o) >>> 6, n[3] = 128 | 63 & o) : 2048 < o ? (n[0] = 224 | (61440 & o) >>> 12, n[1] = 128 | (4032 & o) >>> 6, n[2] = 128 | 63 & o) : 128 < o ? (n[0] = 192 | (1984 & o) >>> 6, n[1] = 128 | 63 & o) : n[0] = o, this.parsedData.push(n)
            }
            this.parsedData = Array.prototype.concat.apply([], this.parsedData), this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239))
        }

        function h(t, e) {
            this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
        }

        i.prototype = {
            getLength: function (t) {
                return this.parsedData.length
            }, write: function (t) {
                for (var e = 0, i = this.parsedData.length; e < i; e++) t.put(this.parsedData[e], 8)
            }
        }, h.prototype = {
            addData: function (t) {
                var e = new i(t);
                this.dataList.push(e), this.dataCache = null
            }, isDark: function (t, e) {
                if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e) throw new Error(t + "," + e);
                return this.modules[t][e]
            }, getModuleCount: function () {
                return this.moduleCount
            }, make: function () {
                this.makeImpl(!1, this.getBestMaskPattern())
            }, makeImpl: function (t, e) {
                this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
                for (var i = 0; i < this.moduleCount; i++) {
                    this.modules[i] = new Array(this.moduleCount);
                    for (var n = 0; n < this.moduleCount; n++) this.modules[i][n] = null
                }
                this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(t, e), 7 <= this.typeNumber && this.setupTypeNumber(t), null == this.dataCache && (this.dataCache = h.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, e)
            }, setupPositionProbePattern: function (t, e) {
                for (var i = -1; i <= 7; i++) if (!(t + i <= -1 || this.moduleCount <= t + i)) for (var n = -1; n <= 7; n++) e + n <= -1 || this.moduleCount <= e + n || (this.modules[t + i][e + n] = 0 <= i && i <= 6 && (0 == n || 6 == n) || 0 <= n && n <= 6 && (0 == i || 6 == i) || 2 <= i && i <= 4 && 2 <= n && n <= 4)
            }, getBestMaskPattern: function () {
                for (var t = 0, e = 0, i = 0; i < 8; i++) {
                    this.makeImpl(!0, i);
                    var n = v.getLostPoint(this);
                    (0 == i || n < t) && (t = n, e = i)
                }
                return e
            }, createMovieClip: function (t, e, i) {
                var n = t.createEmptyMovieClip(e, i);
                this.make();
                for (var o = 0; o < this.modules.length; o++) for (var r = 1 * o, a = 0; a < this.modules[o].length; a++) {
                    var s = 1 * a;
                    this.modules[o][a] && (n.beginFill(0, 100), n.moveTo(s, r), n.lineTo(1 + s, r), n.lineTo(1 + s, 1 + r), n.lineTo(s, 1 + r), n.endFill())
                }
                return n
            }, setupTimingPattern: function () {
                for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
                for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0)
            }, setupPositionAdjustPattern: function () {
                for (var t = v.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var i = 0; i < t.length; i++) {
                    var n = t[e], o = t[i];
                    if (null == this.modules[n][o]) for (var r = -2; r <= 2; r++) for (var a = -2; a <= 2; a++) this.modules[n + r][o + a] = -2 == r || 2 == r || -2 == a || 2 == a || 0 == r && 0 == a
                }
            }, setupTypeNumber: function (t) {
                for (var e = v.getBCHTypeNumber(this.typeNumber), i = 0; i < 18; i++) {
                    var n = !t && 1 == (e >> i & 1);
                    this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = n
                }
                for (i = 0; i < 18; i++) {
                    n = !t && 1 == (e >> i & 1);
                    this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = n
                }
            }, setupTypeInfo: function (t, e) {
                for (var i = this.errorCorrectLevel << 3 | e, n = v.getBCHTypeInfo(i), o = 0; o < 15; o++) {
                    var r = !t && 1 == (n >> o & 1);
                    o < 6 ? this.modules[o][8] = r : o < 8 ? this.modules[o + 1][8] = r : this.modules[this.moduleCount - 15 + o][8] = r
                }
                for (o = 0; o < 15; o++) {
                    r = !t && 1 == (n >> o & 1);
                    o < 8 ? this.modules[8][this.moduleCount - o - 1] = r : o < 9 ? this.modules[8][15 - o - 1 + 1] = r : this.modules[8][15 - o - 1] = r
                }
                this.modules[this.moduleCount - 8][8] = !t
            }, mapData: function (t, e) {
                for (var i = -1, n = this.moduleCount - 1, o = 7, r = 0, a = this.moduleCount - 1; 0 < a; a -= 2) for (6 == a && a--; ;) {
                    for (var s = 0; s < 2; s++) if (null == this.modules[n][a - s]) {
                        var h = !1;
                        r < t.length && (h = 1 == (t[r] >>> o & 1)), v.getMask(e, n, a - s) && (h = !h), this.modules[n][a - s] = h, -1 == --o && (r++, o = 7)
                    }
                    if ((n += i) < 0 || this.moduleCount <= n) {
                        n -= i, i = -i;
                        break
                    }
                }
            }
        }, h.PAD0 = 236, h.PAD1 = 17, h.createData = function (t, e, i) {
            for (var n = g.getRSBlocks(t, e), o = new m, r = 0; r < i.length; r++) {
                var a = i[r];
                o.put(a.mode, 4), o.put(a.getLength(), v.getLengthInBits(a.mode, t)), a.write(o)
            }
            var s = 0;
            for (r = 0; r < n.length; r++) s += n[r].dataCount;
            if (o.getLengthInBits() > 8 * s) throw new Error("code length overflow. (" + o.getLengthInBits() + ">" + 8 * s + ")");
            for (o.getLengthInBits() + 4 <= 8 * s && o.put(0, 4); o.getLengthInBits() % 8 != 0;) o.putBit(!1);
            for (; !(o.getLengthInBits() >= 8 * s || (o.put(h.PAD0, 8), o.getLengthInBits() >= 8 * s));) o.put(h.PAD1, 8);
            return h.createBytes(o, n)
        }, h.createBytes = function (t, e) {
            for (var i = 0, n = 0, o = 0, r = new Array(e.length), a = new Array(e.length), s = 0; s < e.length; s++) {
                var h = e[s].dataCount, l = e[s].totalCount - h;
                n = Math.max(n, h), o = Math.max(o, l), r[s] = new Array(h);
                for (var c = 0; c < r[s].length; c++) r[s][c] = 255 & t.buffer[c + i];
                i += h;
                var d = v.getErrorCorrectPolynomial(l), u = new w(r[s], d.getLength() - 1).mod(d);
                a[s] = new Array(d.getLength() - 1);
                for (c = 0; c < a[s].length; c++) {
                    var f = c + u.getLength() - a[s].length;
                    a[s][c] = 0 <= f ? u.get(f) : 0
                }
            }
            var p = 0;
            for (c = 0; c < e.length; c++) p += e[c].totalCount;
            var g = new Array(p), m = 0;
            for (c = 0; c < n; c++) for (s = 0; s < e.length; s++) c < r[s].length && (g[m++] = r[s][c]);
            for (c = 0; c < o; c++) for (s = 0; s < e.length; s++) c < a[s].length && (g[m++] = a[s][c]);
            return g
        };
        for (var r = {MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8}, l = {
            L: 1,
            M: 0,
            Q: 3,
            H: 2
        }, n = 0, o = 1, a = 2, s = 3, c = 4, d = 5, u = 6, f = 7, v = {
            PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function (t) {
                for (var e = t << 10; 0 <= v.getBCHDigit(e) - v.getBCHDigit(v.G15);) e ^= v.G15 << v.getBCHDigit(e) - v.getBCHDigit(v.G15);
                return (t << 10 | e) ^ v.G15_MASK
            },
            getBCHTypeNumber: function (t) {
                for (var e = t << 12; 0 <= v.getBCHDigit(e) - v.getBCHDigit(v.G18);) e ^= v.G18 << v.getBCHDigit(e) - v.getBCHDigit(v.G18);
                return t << 12 | e
            },
            getBCHDigit: function (t) {
                for (var e = 0; 0 != t;) e++, t >>>= 1;
                return e
            },
            getPatternPosition: function (t) {
                return v.PATTERN_POSITION_TABLE[t - 1]
            },
            getMask: function (t, e, i) {
                switch (t) {
                    case n:
                        return (e + i) % 2 == 0;
                    case o:
                        return e % 2 == 0;
                    case a:
                        return i % 3 == 0;
                    case s:
                        return (e + i) % 3 == 0;
                    case c:
                        return (Math.floor(e / 2) + Math.floor(i / 3)) % 2 == 0;
                    case d:
                        return e * i % 2 + e * i % 3 == 0;
                    case u:
                        return (e * i % 2 + e * i % 3) % 2 == 0;
                    case f:
                        return (e * i % 3 + (e + i) % 2) % 2 == 0;
                    default:
                        throw new Error("bad maskPattern:" + t)
                }
            },
            getErrorCorrectPolynomial: function (t) {
                for (var e = new w([1], 0), i = 0; i < t; i++) e = e.multiply(new w([1, p.gexp(i)], 0));
                return e
            },
            getLengthInBits: function (t, e) {
                if (1 <= e && e < 10) switch (t) {
                    case r.MODE_NUMBER:
                        return 10;
                    case r.MODE_ALPHA_NUM:
                        return 9;
                    case r.MODE_8BIT_BYTE:
                    case r.MODE_KANJI:
                        return 8;
                    default:
                        throw new Error("mode:" + t)
                } else if (e < 27) switch (t) {
                    case r.MODE_NUMBER:
                        return 12;
                    case r.MODE_ALPHA_NUM:
                        return 11;
                    case r.MODE_8BIT_BYTE:
                        return 16;
                    case r.MODE_KANJI:
                        return 10;
                    default:
                        throw new Error("mode:" + t)
                } else {
                    if (!(e < 41)) throw new Error("type:" + e);
                    switch (t) {
                        case r.MODE_NUMBER:
                            return 14;
                        case r.MODE_ALPHA_NUM:
                            return 13;
                        case r.MODE_8BIT_BYTE:
                            return 16;
                        case r.MODE_KANJI:
                            return 12;
                        default:
                            throw new Error("mode:" + t)
                    }
                }
            },
            getLostPoint: function (t) {
                for (var e = t.getModuleCount(), i = 0, n = 0; n < e; n++) for (var o = 0; o < e; o++) {
                    for (var r = 0, a = t.isDark(n, o), s = -1; s <= 1; s++) if (!(n + s < 0 || e <= n + s)) for (var h = -1; h <= 1; h++) o + h < 0 || e <= o + h || 0 == s && 0 == h || a == t.isDark(n + s, o + h) && r++;
                    5 < r && (i += 3 + r - 5)
                }
                for (n = 0; n < e - 1; n++) for (o = 0; o < e - 1; o++) {
                    var l = 0;
                    t.isDark(n, o) && l++, t.isDark(n + 1, o) && l++, t.isDark(n, o + 1) && l++, t.isDark(n + 1, o + 1) && l++, 0 != l && 4 != l || (i += 3)
                }
                for (n = 0; n < e; n++) for (o = 0; o < e - 6; o++) t.isDark(n, o) && !t.isDark(n, o + 1) && t.isDark(n, o + 2) && t.isDark(n, o + 3) && t.isDark(n, o + 4) && !t.isDark(n, o + 5) && t.isDark(n, o + 6) && (i += 40);
                for (o = 0; o < e; o++) for (n = 0; n < e - 6; n++) t.isDark(n, o) && !t.isDark(n + 1, o) && t.isDark(n + 2, o) && t.isDark(n + 3, o) && t.isDark(n + 4, o) && !t.isDark(n + 5, o) && t.isDark(n + 6, o) && (i += 40);
                var c = 0;
                for (o = 0; o < e; o++) for (n = 0; n < e; n++) t.isDark(n, o) && c++;
                return i += 10 * (Math.abs(100 * c / e / e - 50) / 5)
            }
        }, p = {
            glog: function (t) {
                if (t < 1) throw new Error("glog(" + t + ")");
                return p.LOG_TABLE[t]
            }, gexp: function (t) {
                for (; t < 0;) t += 255;
                for (; 256 <= t;) t -= 255;
                return p.EXP_TABLE[t]
            }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256)
        }, t = 0; t < 8; t++) p.EXP_TABLE[t] = 1 << t;
        for (t = 8; t < 256; t++) p.EXP_TABLE[t] = p.EXP_TABLE[t - 4] ^ p.EXP_TABLE[t - 5] ^ p.EXP_TABLE[t - 6] ^ p.EXP_TABLE[t - 8];
        for (t = 0; t < 255; t++) p.LOG_TABLE[p.EXP_TABLE[t]] = t;

        function w(t, e) {
            if (null == t.length) throw new Error(t.length + "/" + e);
            for (var i = 0; i < t.length && 0 == t[i];) i++;
            this.num = new Array(t.length - i + e);
            for (var n = 0; n < t.length - i; n++) this.num[n] = t[n + i]
        }

        function g(t, e) {
            this.totalCount = t, this.dataCount = e
        }

        function m() {
            this.buffer = [], this.length = 0
        }

        w.prototype = {
            get: function (t) {
                return this.num[t]
            }, getLength: function () {
                return this.num.length
            }, multiply: function (t) {
                for (var e = new Array(this.getLength() + t.getLength() - 1), i = 0; i < this.getLength(); i++) for (var n = 0; n < t.getLength(); n++) e[i + n] ^= p.gexp(p.glog(this.get(i)) + p.glog(t.get(n)));
                return new w(e, 0)
            }, mod: function (t) {
                if (this.getLength() - t.getLength() < 0) return this;
                for (var e = p.glog(this.get(0)) - p.glog(t.get(0)), i = new Array(this.getLength()), n = 0; n < this.getLength(); n++) i[n] = this.get(n);
                for (n = 0; n < t.getLength(); n++) i[n] ^= p.gexp(p.glog(t.get(n)) + e);
                return new w(i, 0).mod(t)
            }
        }, g.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], g.getRSBlocks = function (t, e) {
            var i = g.getRsBlockTable(t, e);
            if (null == i) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);
            for (var n = i.length / 3, o = [], r = 0; r < n; r++) for (var a = i[3 * r + 0], s = i[3 * r + 1], h = i[3 * r + 2], l = 0; l < a; l++) o.push(new g(s, h));
            return o
        }, g.getRsBlockTable = function (t, e) {
            switch (e) {
                case l.L:
                    return g.RS_BLOCK_TABLE[4 * (t - 1) + 0];
                case l.M:
                    return g.RS_BLOCK_TABLE[4 * (t - 1) + 1];
                case l.Q:
                    return g.RS_BLOCK_TABLE[4 * (t - 1) + 2];
                case l.H:
                    return g.RS_BLOCK_TABLE[4 * (t - 1) + 3];
                default:
                    return
            }
        }, m.prototype = {
            get: function (t) {
                var e = Math.floor(t / 8);
                return 1 == (this.buffer[e] >>> 7 - t % 8 & 1)
            }, put: function (t, e) {
                for (var i = 0; i < e; i++) this.putBit(1 == (t >>> e - i - 1 & 1))
            }, getLengthInBits: function () {
                return this.length
            }, putBit: function (t) {
                var e = Math.floor(this.length / 8);
                this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++
            }
        };
        var C = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];

        function _() {
            var t = !1, e = navigator.userAgent;
            if (/android/i.test(e)) {
                t = !0;
                var i = e.toString().match(/android ([0-9]\.[0-9])/i);
                i && i[1] && (t = parseFloat(i[1]))
            }
            return t
        }

        var y = (e.prototype.draw = function (t) {
            var e = this._htOption, i = this._el, n = t.getModuleCount();

            function o(t, e) {
                var i = document.createElementNS("http://www.w3.org/2000/svg", t);
                for (var n in e) e.hasOwnProperty(n) && i.setAttribute(n, e[n]);
                return i
            }

            Math.floor(e.width / n), Math.floor(e.height / n), this.clear();
            var r = o("svg", {
                viewBox: "0 0 " + String(n) + " " + String(n),
                width: "100%",
                height: "100%",
                fill: e.colorLight
            });
            r.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), i.appendChild(r), r.appendChild(o("rect", {
                fill: e.colorLight,
                width: "100%",
                height: "100%"
            })), r.appendChild(o("rect", {fill: e.colorDark, width: "1", height: "1", id: "template"}));
            for (var a = 0; a < n; a++) for (var s = 0; s < n; s++) if (t.isDark(a, s)) {
                var h = o("use", {x: String(s), y: String(a)});
                h.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template"), r.appendChild(h)
            }
        }, e.prototype.clear = function () {
            for (; this._el.hasChildNodes();) this._el.removeChild(this._el.lastChild)
        }, e);

        function e(t, e) {
            this._el = t, this._htOption = e
        }

        var b = "svg" === document.documentElement.tagName.toLowerCase() ? y : "undefined" == typeof CanvasRenderingContext2D ? (L.prototype.draw = function (t) {
            for (var e = this._htOption, i = this._el, n = t.getModuleCount(), o = Math.floor(e.width / n), r = Math.floor(e.height / n), a = ['<table style="border:0;border-collapse:collapse;">'], s = 0; s < n; s++) {
                a.push("<tr>");
                for (var h = 0; h < n; h++) a.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + o + "px;height:" + r + "px;background-color:" + (t.isDark(s, h) ? e.colorDark : e.colorLight) + ';"></td>');
                a.push("</tr>")
            }
            a.push("</table>"), i.innerHTML = a.join("");
            var l = i.childNodes[0], c = (e.width - l.offsetWidth) / 2, d = (e.height - l.offsetHeight) / 2;
            0 < c && 0 < d && (l.style.margin = d + "px " + c + "px")
        }, L.prototype.clear = function () {
            this._el.innerHTML = ""
        }, L) : function () {
            function t() {
                this._elImage.src = this._elCanvas.toDataURL("image/png"), this._elImage.style.display = "block", this._elCanvas.style.display = "none"
            }

            var d = window;
            if (d._android && d._android <= 2.1) {
                var u = 1 / window.devicePixelRatio, f = CanvasRenderingContext2D.prototype.drawImage;
                CanvasRenderingContext2D.prototype.drawImage = function (t, e, i, n, o, r, a, s, h) {
                    var l = arguments;
                    if ("nodeName" in t && /img/i.test(t.nodeName)) for (var c = arguments.length - 1; 1 <= c; c--) l[c] = l[c] * u; else void 0 === s && (arguments[1] *= u, arguments[2] *= u, arguments[3] *= u, arguments[4] *= u);
                    f.apply(d, arguments)
                }
            }

            function e(t, e) {
                this._bIsPainted = !1, this._android = _(), this._htOption = e, this._elCanvas = document.createElement("canvas"), this._elCanvas.width = e.width, this._elCanvas.height = e.height, t.appendChild(this._elCanvas), this._el = t, this._oContext = this._elCanvas.getContext("2d"), this._bIsPainted = !1, this._elImage = document.createElement("img"), this._elImage.alt = "Scan me!", this._elImage.style.display = "none", this._el.appendChild(this._elImage), this._bSupportDataURI = null
            }

            return e.prototype.draw = function (t) {
                var e = this._elImage, i = this._oContext, n = this._htOption, o = t.getModuleCount(), r = n.width / o,
                    a = n.height / o, s = Math.round(r), h = Math.round(a);
                e.style.display = "none", this.clear();
                for (var l = 0; l < o; l++) for (var c = 0; c < o; c++) {
                    var d = t.isDark(l, c), u = c * r, f = l * a;
                    i.strokeStyle = d ? n.colorDark : n.colorLight, i.lineWidth = 1, i.fillStyle = d ? n.colorDark : n.colorLight, i.fillRect(u, f, r, a), i.strokeRect(Math.floor(u) + .5, Math.floor(f) + .5, s, h), i.strokeRect(Math.ceil(u) - .5, Math.ceil(f) - .5, s, h)
                }
                this._bIsPainted = !0
            }, e.prototype.makeImage = function () {
                this._bIsPainted && function (t, e) {
                    var i = this;
                    if (i._fFail = e, i._fSuccess = t, null === i._bSupportDataURI) {
                        var n = document.createElement("img"), o = function () {
                            i._bSupportDataURI = !1, i._fFail && i._fFail.call(i)
                        };
                        return n.onabort = o, n.onerror = o, n.onload = function () {
                            i._bSupportDataURI = !0, i._fSuccess && i._fSuccess.call(i)
                        }, void (n.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
                    }
                    !0 === i._bSupportDataURI && i._fSuccess ? i._fSuccess.call(i) : !1 === i._bSupportDataURI && i._fFail && i._fFail.call(i)
                }.call(this, t)
            }, e.prototype.isPainted = function () {
                return this._bIsPainted
            }, e.prototype.clear = function () {
                this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height), this._bIsPainted = !1
            }, e.prototype.round = function (t) {
                return t ? Math.floor(1e3 * t) / 1e3 : t
            }, e
        }();

        function L(t, e) {
            this._el = t, this._htOption = e
        }

        function E(t, e) {
            for (var i, n, o = 1, r = (i = t, (n = encodeURI(i).toString().replace(/\%[0-9a-fA-F]{2}/g, "a")).length + (n.length != i ? 3 : 0)), a = 0, s = C.length; a <= s; a++) {
                var h = 0;
                switch (e) {
                    case l.L:
                        h = C[a][0];
                        break;
                    case l.M:
                        h = C[a][1];
                        break;
                    case l.Q:
                        h = C[a][2];
                        break;
                    case l.H:
                        h = C[a][3]
                }
                if (r <= h) break;
                o++
            }
            if (C.length < o) throw new Error("Too long data");
            return o
        }

        window.QRCode = function (t, e) {
            if (this._htOption = {
                width: 256,
                height: 256,
                typeNumber: 4,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: l.H
            }, "string" == typeof e && (e = {text: e}), e) for (var i in e) this._htOption[i] = e[i];
            "string" == typeof t && (t = document.getElementById(t)), this._htOption.useSVG && (b = y), this._android = _(), this._el = t, this._oQRCode = null, this._oDrawing = new b(this._el, this._htOption), this._htOption.text && this.makeCode(this._htOption.text)
        }, QRCode.prototype.makeCode = function (t) {
            this._oQRCode = new h(E(t, this._htOption.correctLevel), this._htOption.correctLevel), this._oQRCode.addData(t), this._oQRCode.make(), this._el.title = t, this._oDrawing.draw(this._oQRCode), this.makeImage()
        }, QRCode.prototype.makeImage = function () {
            "function" == typeof this._oDrawing.makeImage && (!this._android || 3 <= this._android) && this._oDrawing.makeImage()
        }, QRCode.prototype.clear = function () {
            this._oDrawing.clear()
        }, QRCode.CorrectLevel = l, QRCode
    }(), function (s) {
        var t,
            r = '<svg><symbol id="icongoogle" viewBox="0 0 1024 1024"><path d="M920.69140625 175.23828125l0 673.49707031c0 19.66992188-7.09277344 36.53173828-21.23876953 50.70410156C885.25390625 913.625 868.35253906 920.69140625 848.76171875 920.69140625L175.23828125 920.69140625c-19.59082031 0-36.53173828-7.06640625-50.69091797-21.25195313C110.41455078 885.26708984 103.30859375 868.40527344 103.30859375 848.73535156L103.30859375 175.23828125c0-19.60400391 7.10595703-36.4921875 21.23876953-50.69091797C138.70654297 110.38818359 155.64746094 103.30859375 175.23828125 103.30859375l673.5234375 0c19.59082031 0 36.4921875 7.07958984 50.69091797 21.23876953C913.59863281 138.73291016 920.69140625 155.63427734 920.69140625 175.23828125zM551.27392578 237.34619141c0-5.97216797-6.02490234-8.97802734-18.02197265-8.97802735-1.64794922 0-15.76757813-0.14501953-42.49072266-0.4086914-26.73632813-0.27685547-46.48535156-0.27685547-59.29980469 0-12.77490234 0.27685547-29.26757813 1.37109375-49.41210937 3.28271484-20.22363281 1.8984375-36.26806641 4.75927734-48.22558594 8.55615234-31.61425781 10.34912109-56.79492188 27.23730469-75.62109375 50.71728516-18.79980469 23.40087891-28.19970703 51.17871094-28.19970703 83.35986328 0 38.14013672 11.98388672 68.92382813 35.96484375 92.31152344 23.92822266 23.4140625 55.02832031 34.87060547 93.16845703 34.33007812l4.93066406 0c0 13.11767578 0.54052734 22.62304688 1.60839844 28.66113282 1.09423828 5.98535156 2.47851563 9.12304688 4.12646484 9.39990234s3.67822266 1.60839844 6.10400391 4.08691406c2.43896484 2.42578125 4.73291016 6.38085938 6.97412109 11.83886719-29.97949219 0-57.92871094 3.22998047-83.80810547 9.76904297-25.87939453 6.56542969-49.12207031 19.59082031-69.87304687 39.27392578-20.671875 19.59082031-31.03417969 44.38916016-31.03417969 74.38183594 0 41.92382813 16.75634766 73.15576172 50.28222656 93.60351562 33.52587891 20.39501953 72.60205078 30.62548828 117.25488282 30.62548828 50.16357422 0 93.62988281-12.39257813 130.38574218-37.20410156 36.79541016-24.79833984 55.21289063-61.13232422 55.21289063-109.10742187 0-20.68505859-5.31298828-40.57910156-15.95214844-59.65576172-10.58642578-19.07666016-22.47802734-34.06640625-35.52978515-44.96923828-13.10449219-10.86328125-24.93017578-21.37060547-35.54296875-31.4428711-10.63916016-10.125-15.96533203-17.87695313-15.96533204-23.34814453 0-5.97216797 4.08691406-12.91992188 12.30029297-20.83007812 8.16064453-7.89697266 17.24414063-15.79394531 27.35595703-23.70410157 10.125-7.89697266 19.23486328-20.56640625 27.40869141-38.06103515 8.16064453-17.37597656 12.26074219-37.61279297 12.26074219-60.49951172 0-41.37011719-11.98388672-70.53222656-35.96484375-87.42041016 0.58007813 0 4.73291016-0.421875 12.69580078-1.23925781 7.91015625-0.81738281 13.46044922-1.62158203 16.75634766-2.45214844 3.21679688-0.83056641 7.91015625-2.16210938 13.89550781-4.08691406 5.98535156-1.91162109 10.19091797-4.640625 12.66943359-8.17382813C549.99511719 246.48242187 551.27392578 242.29003906 551.27392578 237.34619141zM485.84375 658.32470703c0 23.99414063-11.70703125 43.30810547-35.13427734 57.98144531-23.45361328 14.75244141-47.98828125 22.09570313-73.6171875 22.09570313-25.57617188 0-48.87158203-6.49951172-69.8334961-19.59082031-20.97509766-13.09130859-31.49560547-31.65380859-31.49560547-55.60839844 0-26.18261719 11.16650391-45.78662109 33.52587891-58.8515625 22.31982422-13.06494141 47.39501953-19.60400391 75.18603516-19.60400391 25.1015625 0 48.25195313 6.42041016 69.53027343 19.1953125C475.19140625 616.78320313 485.84375 634.91064453 485.84375 658.32470703zM440.86132812 376.30126953c0 19.10302734-4.21875 35.46386719-12.68261718 49.02978516-8.4375 13.65820313-21.64746094 20.50048828-39.60351563 20.50048828-23.45361328 0-42.06884766-12.39257813-56.00390625-37.20410156-13.86914063-24.79833984-20.83007813-49.71533203-20.83007812-74.81689454 0-19.06347656 4.21875-35.37158203 12.69580078-49.01660156 8.42431641-13.60546875 21.64746094-20.43457031 39.65625-20.43457031 23.4140625 0 42.06884766 12.37939453 55.96435547 37.17773437C433.96630859 326.36181641 440.86132812 351.27880859 440.86132812 376.30126953zM726.99804688 370.60595703l98.87695312 0 0-49.05615234-98.87695313 0L726.99804688 221.82910156l-49.04296876 0 0 99.72070313-99.70751953 0 0 49.05615234 99.70751954 0-1e-8 98.89013672 49.04296875 0L726.99804688 370.60595703z" fill="#d81e06" ></path></symbol><symbol id="icondouban" viewBox="0 0 1024 1024"><path d="M238.16899108 116.4921875h547.6619406A121.59925314 121.59925314 0 0 1 907.50773525 237.3159348v549.36805315A121.59925314 121.59925314 0 0 1 785.83093168 907.50773525H238.16899108A121.59925314 121.59925314 0 0 1 116.4921875 786.68398795V237.3159348A121.59925314 121.59925314 0 0 1 238.16899108 116.4921875z" fill="#42BD56" ></path><path d="M248.71586504 239.72000201H775.67181063v58.93841277H248.71586504zM729.14148371 593.04027923V360.77640059H294.85843827v231.64347442l434.28304544 0.62040422zM357.98458125 420.41276878H667.10104908v113.61154725H357.98458125z m277.63094678 305.54914263a690.97534589 690.97534589 0 0 0 53.35477406-100.81570692l-63.35879424-23.26516308a818.77864197 818.77864197 0 0 1-57.07720013 124.08087H457.7145806a579.92296672 579.92296672 0 0 0-62.04043538-124.08087l-58.395559 23.26516308a909.12502612 909.12502612 0 0 1 58.39555899 100.81570692H233.7486096v58.31800933h556.50270279v-58.31800933z" fill="#FFFFFF" ></path></symbol><symbol id="icondiandian" viewBox="0 0 1024 1024"><path d="M536.99960938 686.99990234h325.00019531V361.99970703l-324.52470703 0.05009766-0.47460938-75.04980469h249.99960938V186.99980469H536.99960938V112.00097656H411.99980469v249.99960938h-225v325.00019531h174.99990234v226.77539063l174.99990234-226.77539063z m-225.00000001-82.29990234V450.17509766H737v154.52490234H311.99960937z m499.8506836 156.62460937c-41.34990234 0-74.85029297 33.87568359-74.85029297 75.67558594 0 41.79990234 33.50039063 75.70019531 74.85029297 75.70019531 41.32441406 0 74.84941406-33.87568359 74.84941406-75.70019531-0.02460937-41.80078125-33.525-75.67558594-74.84941406-75.67558594z m-224.85058594 0c-41.32441406 0-74.84941406 33.87568359-74.84941406 75.67558594 0 41.79990234 33.49951172 75.70019531 74.84941406 75.70019531 41.32529297 0 74.85029297-33.87568359 74.85029297-75.70019531 0-41.80078125-33.525-75.67558594-74.85029297-75.67558594z m-374.99941406 0c-41.32529297 0-74.85029297 33.87568359-74.85029297 75.67558594 0 41.79990234 33.50039063 75.70019531 74.85029297 75.70019531 41.32441406 0 74.84941406-33.87568359 74.84941406-75.70019531 0-41.80078125-33.525-75.67558594-74.84941406-75.67558594z" fill="#1296db" ></path></symbol><symbol id="iconwechat" viewBox="0 0 1024 1024"><path d="M683.058 364.695c11 0 22 1.016 32.943 1.976C686.564 230.064 538.896 128 370.681 128c-188.104 0.66-342.237 127.793-342.237 289.226 0 93.068 51.379 169.827 136.725 229.256L130.72 748.43l119.796-59.368c42.918 8.395 77.37 16.79 119.742 16.79 11 0 21.46-0.48 31.914-1.442a259.168 259.168 0 0 1-10.455-71.358c0.485-148.002 128.744-268.297 291.403-268.297l-0.06-0.06z m-184.113-91.992c25.99 0 42.913 16.79 42.913 42.575 0 25.188-16.923 42.579-42.913 42.579-25.45 0-51.38-16.85-51.38-42.58 0-25.784 25.93-42.574 51.38-42.574z m-239.544 85.154c-25.384 0-51.374-16.85-51.374-42.58 0-25.784 25.99-42.574 51.374-42.574 25.45 0 42.918 16.79 42.918 42.575 0 25.188-16.924 42.579-42.918 42.579z m736.155 271.655c0-135.647-136.725-246.527-290.983-246.527-162.655 0-290.918 110.88-290.918 246.527 0 136.128 128.263 246.587 290.918 246.587 33.972 0 68.423-8.395 102.818-16.85l93.809 50.973-25.93-84.677c68.907-51.93 120.286-119.815 120.286-196.033z m-385.275-42.58c-16.923 0-34.452-16.79-34.452-34.179 0-16.79 17.529-34.18 34.452-34.18 25.99 0 42.918 16.85 42.918 34.18 0 17.39-16.928 34.18-42.918 34.18z m188.165 0c-16.984 0-33.972-16.79-33.972-34.179 0-16.79 16.927-34.18 33.972-34.18 25.93 0 42.913 16.85 42.913 34.18 0 17.39-16.983 34.18-42.913 34.18z" fill="#09BB07" ></path></symbol><symbol id="iconqzone" viewBox="0 0 1024 1024"><path d="M955.728 428.224c8.385-8.785 3.76-23.536-8.073-25.753l-276.832-51.854c-4.838-0.906-9.02-3.987-11.38-8.383L525.873 93.229c-2.798-5.23-8.342-7.85-13.875-7.896-5.532 0.045-11.075 2.667-13.873 7.896L364.558 342.234c-2.36 4.396-6.543 7.477-11.381 8.383L76.345 402.471c-11.833 2.217-16.458 16.968-8.073 25.753L269.64 639.086c3.564 3.733 5.205 8.952 4.433 14.1l-46.015 282.032c-1.819 12.126 10.394 21.407 21.298 16.182L505 827.827a16.098 16.098 0 0 1 7-1.58 16.1 16.1 0 0 1 7.003 1.58L774.644 951.4c10.904 5.225 23.117-4.056 21.298-16.182l-46.88-287.298 206.666-219.696z" fill="#FFCD00" ></path><path d="M559.42 493.63c-4.517-3.772-110.987-40.332-273.968-16-3.16 0.47-5.913-0.394-8.04-1.992-0.717 4 3.587 7.152 8.988 7.527 115.064 8.021 179.42 54.987 199.492 71.501 40.78-28.923 71.882-50.606 73.063-51.527 3.668-2.856 3.695-6.811 0.465-9.51m135.65-29.972c-41.744 35.168-160.159 116.897-201.52 148.468-4.864 3.711-3.177 9.424 2.098 11.43 17.045 6.488 36.23 11.95 56.421 16.445l159.784-152.228c12.544-13.184 5.238-29.152-10.422-32.661-1.025 3.011-3.259 5.933-6.36 8.546M817.187 640l-0.101 0.045c-70.456 29.709-241.54 79.623-451.762 72.33-25.386-0.88-50.63-3.715-64.786-6.325-2.067-0.38-3.878-1.012-5.476-1.846-10.567 12.224 2.073 21.462 47.148 30.58 131.886 26.676 286.047 38.934 415.304 30.665l-8.884-54.324c43.727-31.431 64.996-58.546 67.524-62.57 2.899-4.616 1.033-8.555 1.033-8.555" fill="#F1A308" ></path><path d="M818.863 646.995c-53.31 5.137-215.894 3.686-311.826-33.167-5.107-1.962-6.834-7.566-2.129-11.194 40.025-30.84 154.62-110.68 195.014-145.035 7.872-6.696 9.95-15.437 0.375-22.542-18.36-13.623-83.168-36.203-158.198-36.816-107.373-0.88-212.858 29.498-259.133 54.09-10.983 5.837-4.392 21.221 6.83 19.495 164.223-25.24 271.495 12.756 276.045 16.67 3.255 2.798 3.074 6.906-0.5 9.715-3.036 2.389-199.263 143.36-258.23 193.11-9.286 7.834-6.845 24.246 8.35 27.018 14.152 2.582 39.406 5.412 64.784 6.284 210.173 7.214 381.314-42.24 451.755-71.63 0 0-2.148-7.057-13.137-5.998" fill="#FFFFFF" ></path></symbol><symbol id="iconweibo" viewBox="0 0 1024 1024"><path d="M851.4 590.193c-22.196-66.233-90.385-90.422-105.912-91.863-15.523-1.442-29.593-9.94-19.295-27.505 10.302-17.566 29.304-68.684-7.248-104.681-36.564-36.14-116.512-22.462-173.094 0.866-56.434 23.327-53.39 7.055-51.65-8.925 1.89-16.848 32.355-111.02-60.791-122.395C311.395 220.86 154.85 370.754 99.572 457.15 16 587.607 29.208 675.873 29.208 675.873h0.58c10.009 121.819 190.787 218.869 412.328 218.869 190.5 0 350.961-71.853 398.402-169.478 0 0 0.143-0.433 0.575-1.156 4.938-10.506 8.71-21.168 11.035-32.254 6.668-26.205 11.755-64.215-0.728-101.66z m-436.7 251.27c-157.71 0-285.674-84.095-285.674-187.768 0-103.671 127.82-187.76 285.674-187.76 157.705 0 285.673 84.089 285.673 187.76 0 103.815-127.968 187.768-285.673 187.768z" fill="#E71F19" ></path><path d="M803.096 425.327c2.896 1.298 5.945 1.869 8.994 1.869 8.993 0 17.7-5.328 21.323-14.112 5.95-13.964 8.993-28.793 8.993-44.205 0-62.488-51.208-113.321-114.181-113.321-15.379 0-30.32 3.022-44.396 8.926-11.755 4.896-17.263 18.432-12.335 30.24 4.933 11.662 18.572 17.134 30.465 12.238 8.419-3.46 17.268-5.33 26.41-5.33 37.431 0 67.752 30.241 67.752 67.247 0 9.068-1.735 17.857-5.369 26.202a22.832 22.832 0 0 0 12.335 30.236l0.01 0.01z" fill="#F5AA15" ></path><path d="M726.922 114.157c-25.969 0-51.65 3.744-76.315 10.942-18.423 5.472-28.868 24.622-23.5 42.91 5.509 18.29 24.804 28.657 43.237 23.329a201.888 201.888 0 0 1 56.578-8.064c109.253 0 198.189 88.271 198.189 196.696 0 19.436-2.905 38.729-8.419 57.16-5.508 18.289 4.79 37.588 23.212 43.053 3.342 1.014 6.817 1.442 10.159 1.442 14.943 0 28.725-9.648 33.37-24.48 7.547-24.906 11.462-50.826 11.462-77.175-0.143-146.588-120.278-265.813-267.973-265.813z" fill="#F5AA15" ></path><path d="M388.294 534.47c-84.151 0-152.34 59.178-152.34 132.334 0 73.141 68.189 132.328 152.34 132.328 84.148 0 152.337-59.182 152.337-132.328 0-73.15-68.19-132.334-152.337-132.334zM338.53 752.763c-29.454 0-53.39-23.755-53.39-52.987 0-29.228 23.941-52.989 53.39-52.989 29.453 0 53.39 23.76 53.39 52.989 0 29.227-23.937 52.987-53.39 52.987z m99.82-95.465c-6.382 11.086-19.296 15.696-28.726 10.219-9.43-5.323-11.75-18.717-5.37-29.803 6.386-11.09 19.297-15.7 28.725-10.224 9.43 5.472 11.755 18.864 5.37 29.808z" fill="#040000" ></path></symbol><symbol id="iconqq" viewBox="0 0 1024 1024"><path d="M511.09761 957.257c-80.159 0-153.737-25.019-201.11-62.386-24.057 6.702-54.831 17.489-74.252 30.864-16.617 11.439-14.546 23.106-11.55 27.816 13.15 20.689 225.583 13.211 286.912 6.767v-3.061z" fill="#FAAD08" ></path><path d="M496.65061 957.257c80.157 0 153.737-25.019 201.11-62.386 24.057 6.702 54.83 17.489 74.253 30.864 16.616 11.439 14.543 23.106 11.55 27.816-13.15 20.689-225.584 13.211-286.914 6.767v-3.061z" fill="#FAAD08" ></path><path d="M497.12861 474.524c131.934-0.876 237.669-25.783 273.497-35.34 8.541-2.28 13.11-6.364 13.11-6.364 0.03-1.172 0.542-20.952 0.542-31.155C784.27761 229.833 701.12561 57.173 496.64061 57.162 292.15661 57.173 209.00061 229.832 209.00061 401.665c0 10.203 0.516 29.983 0.547 31.155 0 0 3.717 3.821 10.529 5.67 33.078 8.98 140.803 35.139 276.08 36.034h0.972z" fill="#000000" ></path><path d="M860.28261 619.782c-8.12-26.086-19.204-56.506-30.427-85.72 0 0-6.456-0.795-9.718 0.148-100.71 29.205-222.773 47.818-315.792 46.695h-0.962C410.88561 582.017 289.65061 563.617 189.27961 534.698 185.44461 533.595 177.87261 534.063 177.87261 534.063 166.64961 563.276 155.56661 593.696 147.44761 619.782 108.72961 744.168 121.27261 795.644 130.82461 796.798c20.496 2.474 79.78-93.637 79.78-93.637 0 97.66 88.324 247.617 290.576 248.996a718.01 718.01 0 0 1 5.367 0C708.80161 950.778 797.12261 800.822 797.12261 703.162c0 0 59.284 96.111 79.783 93.637 9.55-1.154 22.093-52.63-16.623-177.017" fill="#000000" ></path><path d="M434.38261 316.917c-27.9 1.24-51.745-30.106-53.24-69.956-1.518-39.877 19.858-73.207 47.764-74.454 27.875-1.224 51.703 30.109 53.218 69.974 1.527 39.877-19.853 73.2-47.742 74.436m206.67-69.956c-1.494 39.85-25.34 71.194-53.24 69.956-27.888-1.238-49.269-34.559-47.742-74.435 1.513-39.868 25.341-71.201 53.216-69.974 27.909 1.247 49.285 34.576 47.767 74.453" fill="#FFFFFF" ></path><path d="M683.94261 368.627c-7.323-17.609-81.062-37.227-172.353-37.227h-0.98c-91.29 0-165.031 19.618-172.352 37.227a6.244 6.244 0 0 0-0.535 2.505c0 1.269 0.393 2.414 1.006 3.386 6.168 9.765 88.054 58.018 171.882 58.018h0.98c83.827 0 165.71-48.25 171.881-58.016a6.352 6.352 0 0 0 1.002-3.395c0-0.897-0.2-1.736-0.531-2.498" fill="#FAAD08" ></path><path d="M467.63161 256.377c1.26 15.886-7.377 30-19.266 31.542-11.907 1.544-22.569-10.083-23.836-25.978-1.243-15.895 7.381-30.008 19.25-31.538 11.927-1.549 22.607 10.088 23.852 25.974m73.097 7.935c2.533-4.118 19.827-25.77 55.62-17.886 9.401 2.07 13.75 5.116 14.668 6.316 1.355 1.77 1.726 4.29 0.352 7.684-2.722 6.725-8.338 6.542-11.454 5.226-2.01-0.85-26.94-15.889-49.905 6.553-1.579 1.545-4.405 2.074-7.085 0.242-2.678-1.834-3.786-5.553-2.196-8.135" fill="#000000" ></path><path d="M504.33261 584.495h-0.967c-63.568 0.752-140.646-7.504-215.286-21.92-6.391 36.262-10.25 81.838-6.936 136.196 8.37 137.384 91.62 223.736 220.118 224.996H506.48461c128.498-1.26 211.748-87.612 220.12-224.996 3.314-54.362-0.547-99.938-6.94-136.203-74.654 14.423-151.745 22.684-215.332 21.927" fill="#FFFFFF" ></path><path d="M323.27461 577.016v137.468s64.957 12.705 130.031 3.91V591.59c-41.225-2.262-85.688-7.304-130.031-14.574" fill="#EB1C26" ></path><path d="M788.09761 432.536s-121.98 40.387-283.743 41.539h-0.962c-161.497-1.147-283.328-41.401-283.744-41.539l-40.854 106.952c102.186 32.31 228.837 53.135 324.598 51.926l0.96-0.002c95.768 1.216 222.4-19.61 324.6-51.924l-40.855-106.952z" fill="#EB1C26" ></path></symbol><symbol id="iconfacebook" viewBox="0 0 1024 1024"><path d="M926 201.522C926 144.347 879.647 98 822.473 98h-620.95C144.347 98 98 144.347 98 201.522v620.95C98 879.649 144.348 926 201.522 926h620.95C879.648 926 926 879.648 926 822.473v-620.95z m-155 102.81H666.666v103.333H771v103.333H666.666V822H563.334V510.998H460V407.665h103.334V272.412c0-34.738 38.262-71.412 77.238-71.412H771v103.332z" fill="#425F9B" ></path></symbol><symbol id="icontwitter" viewBox="0 0 1024 1024"><path d="M996.12 211.772c-27.41 40.139-60.586 74.338-99.524 102.58 0.419 5.715 0.628 14.311 0.628 25.788 0 53.242-7.782 106.353-23.346 159.333-15.565 52.986-39.201 103.845-70.903 152.58-31.707 48.735-69.47 91.84-113.279 129.306-43.813 37.474-96.638 67.37-158.477 89.693-61.84 22.323-127.951 33.491-198.335 33.491-110.943 0-212.483-29.692-304.613-89.063 14.305 1.622 30.264 2.434 47.876 2.434 92.13 0 174.226-28.247 246.284-84.738-42.974-0.84-81.467-14.043-115.478-39.62-34.01-25.57-57.358-58.222-70.042-97.94 13.519 2.04 26.018 3.063 37.495 3.063 17.612 0 35.008-2.256 52.2-6.764-45.855-9.43-83.828-32.252-113.908-68.466-30.08-36.208-45.12-78.268-45.12-126.163v-2.44c27.829 15.564 57.726 23.95 89.694 25.157-27.04-18.026-48.532-41.557-64.463-70.591-15.932-29.03-23.926-60.552-23.973-94.563 0-36.055 9.01-69.41 27.042-100.067 49.525 60.998 109.815 109.812 180.881 146.446 71.06 36.63 147.106 56.99 228.126 61.078-3.249-15.565-4.874-30.71-4.874-45.435 0-54.868 19.337-101.641 58.013-140.316s85.45-58.012 140.32-58.012c57.332 0 105.649 20.886 144.955 62.65 44.653-8.595 86.63-24.553 125.93-47.873-15.144 47.06-44.201 83.511-87.176 109.344 38.1-4.088 76.173-14.33 114.218-30.735l-0.151-0.157z" fill="#00ACED" ></path></symbol><symbol id="iconlinkedin" viewBox="0 0 1024 1024"><path d="M127 908h165V379H127v529z m82.554-792C262.262 116 305 158.823 305 211.474 305 264.186 262.262 307 209.554 307 156.655 307 114 264.186 114 211.474 114 158.823 156.655 116 209.554 116zM396 379.15h157.741v72.277h2.236C577.91 409.815 631.63 366 711.699 366 878.199 366 909 475.484 909 617.916V908H744.588V650.873c0-61.383-1.214-140.283-85.538-140.283-85.642 0-98.7 66.8-98.7 135.745V908H396V379.15z" fill="#006A9A" ></path></symbol><symbol id="icontengxunweibo" viewBox="0 0 1024 1024"><path d="M808.63085938 907.5078125H215.36914062c-54.38232422 0-98.87695313-44.49462891-98.87695312-98.87695313V215.36914062C116.4921875 160.98681641 160.98681641 116.4921875 215.36914062 116.4921875h593.26171875c54.38232422 0 98.87695313 44.49462891 98.87695313 98.87695313v593.26171875c0 54.38232422-44.49462891 98.87695313-98.87695313 98.87695312" fill="#47BCF6" ></path><path d="M378.51611328 774.02392578c-9.88769531 0-19.77539063-9.88769531-19.77539062-19.77539062-4.94384766-133.48388672 49.43847656-207.64160156 88.98925781-247.19238282-14.83154297-24.71923828-14.83154297-59.32617188 4.94384765-88.98925781 24.71923828-29.66308594 74.15771484-39.55078125 108.76464844-9.88769531 34.60693359 24.71923828 39.55078125 74.15771484 14.83154297 108.76464844-24.71923828 29.66308594-64.27001953 39.55078125-98.87695312 19.77539062-34.60693359 29.66308594-84.04541016 98.87695313-79.1015625 217.52929688 0 9.88769531-9.88769531 19.77539063-19.77539063 19.77539062" fill="#FFFFFF" ></path><path d="M512 655.37158203c-14.83154297 0-24.71923828 0-39.55078125-4.94384766-9.88769531 0-19.77539063-14.83154297-14.83154297-24.71923828 0-9.88769531 14.83154297-19.77539063 24.71923828-14.83154297 9.88769531 0 19.77539063 4.94384766 29.66308594 4.94384766 79.1015625 0 148.31542969-69.21386719 148.31542969-148.31542969 0-84.04541016-64.27001953-148.31542969-148.31542969-148.31542968s-148.31542969 69.21386719-148.31542969 148.31542968c0 14.83154297 4.94384766 34.60693359 9.88769532 49.43847657 4.94384766 9.88769531 0 19.77539063-14.83154297 24.71923828-9.88769531 4.94384766-19.77539063 0-24.71923828-14.83154297-4.94384766-19.77539063-9.88769531-39.55078125-9.88769532-59.32617188C324.13378906 363.68457031 408.17919922 279.63916016 512 279.63916016s187.86621094 84.04541016 187.86621094 187.86621093c0 103.82080078-84.04541016 187.86621094-187.86621094 187.86621094" fill="#FFFFFF" ></path></symbol></svg>';
        if ((t = document.getElementsByTagName("script"))[t.length - 1].getAttribute("data-injectcss") && !s.__iconfont__svg__cssinject__) {
            s.__iconfont__svg__cssinject__ = !0;
            try {
                document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
            } catch (t) {
                console && console.log(t)
            }
        }
        !function (t) {
            if (document.addEventListener) if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) setTimeout(t, 0); else {
                var e = function () {
                    document.removeEventListener("DOMContentLoaded", e, !1), t()
                };
                document.addEventListener("DOMContentLoaded", e, !1)
            } else document.attachEvent && (n = t, o = s.document, r = !1, (a = function () {
                try {
                    o.documentElement.doScroll("left")
                } catch (t) {
                    return void setTimeout(a, 50)
                }
                i()
            })(), o.onreadystatechange = function () {
                "complete" == o.readyState && (o.onreadystatechange = null, i())
            });

            function i() {
                r || (r = !0, n())
            }

            var n, o, r, a
        }(function () {
            var t, e, i, n, o;
            (t = document.createElement("div")).innerHTML = r, r = null, (e = t.getElementsByTagName("svg")[0]) && (e.setAttribute("aria-hidden", "true"), e.style.position = "absolute", e.style.width = 0, e.style.height = 0, e.style.overflow = "hidden", i = e, (n = document.body).firstChild ? (o = n.firstChild).parentNode.insertBefore(i, o) : n.appendChild(i))
        })
    }(window), o.prototype.getRoot = function (t) {
        if (!document.querySelector(t)) throw'第一个参数应该是元素的类名，例如".custom-share"';
        return document.querySelector(t) || document.createElement("div")
    }, o.prototype.createIcons = function () {
        var o = this;
        this.handleSites();
        var r = "prepend" == this.config.mode;
        r && this.config.sites.reverse(), this.config.sites.forEach(function (t, e) {
            var i = o.makeUrl(t);
            if (o.config.initialized) o.handleLink(t, i); else {
                var n = o.createLink(t, i);
                r ? o.el.insertBefore(n, o.el.firstChild) : o.el.appendChild(n)
            }
        })
    }, o.prototype.createWechat = function () {
        var t = document.querySelector(".wechat");
        if (!t) return !1;
        var e = document.createElement("div");
        e.className = "wechat-qrcode " + this.config.wechatQrcodePosition, e.innerHTML = "<h4>" + this.config.wechatQrcodeTitle + '</h4>\n                            <div class="qrcode"></div>\n                            <div class="help">' + this.config.wechatQrcodeHelper + "</div>";
        var i = e.querySelector(".qrcode");
        new QRCode(i, {
            text: this.config.url,
            width: this.config.wechatQrcodeSize,
            height: this.config.wechatQrcodeSize
        }), t.appendChild(e)
    }, o.prototype.createLink = function (t, e) {
        var i = document.createElement("a");
        return i.className = "share-item " + t, i.href = e, "wechat" == t ? i.tabIndex = -1 : i.target = "_blank", i.innerHTML = '<svg class="icon" aria-hidden="true">\n                            <use xlink:href="#icon' + t + '"></use>\n                        </svg>', i
    }, o.prototype.handleLink = function (t, e) {
        var i = document.querySelector("." + t);
        if (!i) throw"没有找到类名为." + t + "的元素";
        i.href = e
    }, o.prototype.handleSites = function () {
        var o = this.config;
        0 == o.mobileSites.length && (o.mobileSites = o.sites), this.isWx && o.disabled.push("wechat"), 0 < o.disabled.length && o.disabled.forEach(function (t, e) {
            var i = o.sites.indexOf(t), n = o.mobileSites.indexOf(t);
            -1 < i && o.sites.splice(i, 1), -1 < n && o.mobileSites.splice(n, 1)
        })
    }, o.prototype.makeUrl = function (o) {
        var r = this;
        return this.config.summary || (this.config.summary = this.config.description), a[o].replace(/\{\{(\w)(\w*)\}\}/g, function (t, e, i) {
            var n = o + e + i.toLowerCase();
            return i = (e + i).toLowerCase(), encodeURIComponent((void 0 === r.config[n] ? r.config[i] : r.config[n]) || "")
        })
    }, o
});
