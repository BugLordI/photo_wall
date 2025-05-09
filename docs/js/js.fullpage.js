(function (window) {
    var d = {
        page: '.page',
        start: 0,
        duration: 500,
        loop: false,
        drag: false,
        dir: 'v',
        der: 0.1,
        autoPlay: false, // 新增：是否启用自动翻页
        autoPlayInterval: 3000, // 新增：自动翻页的时间间隔（默认3秒）
        change: function (data) {
        },
        beforeChange: function (data) {
        },
        afterChange: function (data) {
        },
        orientationchange: function (orientation) {
        }
    };

    var passiveSupported = false;

    try {
        var options = Object.defineProperty({}, "passive", {
            get: function () {
                passiveSupported = true;
            }
        });

        window.addEventListener("test", null, options);
    } catch (err) {
    }

    var passiveListener = passiveSupported ? {passive: false, capture: false} : false

    function touchmove(e) {
        e.preventDefault();
    }

    function fix(cur, pagesLength, loop) {
        if (cur < 0) {
            return !!loop ? pagesLength - 1 : 0;
        }

        if (cur >= pagesLength) {
            return !!loop ? 0 : pagesLength - 1;
        }

        return cur;
    }

    function move(ele, dir, dist) {
        var xPx = '0px', yPx = '0px';
        if (dir === 'v') yPx = dist + 'px';
        else xPx = dist + "px";
        ele.style.cssText += (';-webkit-transform : translate3d(' + xPx + ', ' + yPx + ', 0px);' +
            'transform : translate3d(' + xPx + ', ' + yPx + ', 0px);');
    }

    function init(option) {
        var o = option ? option : {};
        for (var key in d) {
            if (!o.hasOwnProperty(key)) {
                o[key] = d[key];
            }
        }

        var that = this;
        that.curIndex = -1;
        that.o = o;

        that.startY = 0;
        that.movingFlag = false;

        that.ele.classList.add('fullPage-wp');
        that.parentEle = that.ele.parentNode;

        var query = o.page;
        if (query.indexOf(".") == 0) {
            query = query.substring(1, query.length);
        }
        that.pageEles = that.ele.getElementsByClassName(query);
        for (var i = 0; i < that.pageEles.length; i++) {
            var pageEle = that.pageEles[i];
            pageEle.classList.add('fullPage-page');
            pageEle.classList.add('fullPage-dir-' + o.dir);
        }

        that.pagesLength = that.pageEles.length;
        that.update();
        that.initEvent();

        // 初始化定时器相关变量
        that.autoPlayTimer = null;

        // 启动定时器（如果启用了自动翻页）
        if (that.o.autoPlay) {
            that.startAutoPlay();
        }

        that.start();
    }

    function Fullpage(ele, option) {
        this.ele = ele;
        init.call(this, option);
    }

    Fullpage.prototype.update = function () {
        if (this.o.dir === 'h') {
            this.width = this.parentEle.offsetWidth;
            for (var i = 0; i < this.pageEles.length; i++) {
                var pageEle = this.pageEles[i];
                pageEle.style.width = this.width + 'px';
            }
            this.ele.style.width = (this.width * this.pagesLength) + 'px';
        }

        this.height = this.parentEle.offsetHeight;
        for (var i = 0; i < this.pageEles.length; i++) {
            var pageEle = this.pageEles[i];
            pageEle.style.height = this.height + 'px';
        }

        this.moveTo(this.curIndex < 0 ? this.o.start : this.curIndex);
    };

    Fullpage.prototype.initEvent = function () {
        var that = this;
        var ele = that.ele;

        ele.addEventListener('touchstart', function (e) {
            if (!that.status) {
                return 1;
            }
            if (that.movingFlag) {
                return 0;
            }

            that.startX = e.targetTouches[0].pageX;
            that.startY = e.targetTouches[0].pageY;
        });
        ele.addEventListener('touchend', function (e) {
            if (!that.status) {
                return 1;
            }
            if (that.movingFlag) {
                return 0;
            }

            var sub = that.o.dir === 'v' ? (e.changedTouches[0].pageY - that.startY) / that.height : (e.changedTouches[0].pageX - that.startX) / that.width;
            var der = (sub > that.o.der || sub < -that.o.der) ? sub > 0 ? -1 : 1 : 0;

            that.moveTo(that.curIndex + der, true);
        });
        if (that.o.drag) {
            ele.addEventListener('touchmove', function (e) {
                if (!that.status) {
                    return 1;
                }
                if (that.movingFlag) {
                    that.startX = e.targetTouches[0].pageX;
                    that.startY = e.targetTouches[0].pageY;
                    return 0;
                }

                var y = e.changedTouches[0].pageY - that.startY;
                if ((that.curIndex == 0 && y > 0) || (that.curIndex === that.pagesLength - 1 && y < 0)) y /= 2;
                var x = e.changedTouches[0].pageX - that.startX;
                if ((that.curIndex == 0 && x > 0) || (that.curIndex === that.pagesLength - 1 && x < 0)) x /= 2;
                var dist = (that.o.dir === 'v' ? (-that.curIndex * that.height + y) : (-that.curIndex * that.width + x));
                ele.classList.remove('anim');
                move(ele, that.o.dir, dist);
            });
        }

        window.addEventListener('resize', function () {
            that.update();
        }, false);
    };

    Fullpage.prototype.holdTouch = function () {
        document.addEventListener('touchmove', touchmove, passiveListener);
    };
    Fullpage.prototype.unholdTouch = function () {
        document.removeEventListener('touchmove', touchmove, passiveListener);
    };
    Fullpage.prototype.start = function () {
        this.status = 1;
        this.holdTouch();
    };
    Fullpage.prototype.stop = function () {
        this.status = 0;
        this.unholdTouch();
    };
    Fullpage.prototype.getCurIndex = function () {
        return this.curIndex;
    };
    Fullpage.prototype.moveTo = function (next, anim) {
        var that = this;
        var ele = that.ele;
        var cur = that.curIndex;
        next = fix(next, that.pagesLength, that.o.loop);

        if (anim) {
            ele.classList.add('anim');
        } else {
            ele.classList.remove('anim');
        }

        if (next !== cur) {
            var flag = that.o.beforeChange({
                next: next,
                cur: cur
            });

            // beforeChange 显示返回false 可阻止滚屏的发生
            if (flag === false) {
                return 1;
            }
        }

        that.movingFlag = true;
        that.curIndex = next;
        move(ele, that.o.dir, -next * (that.o.dir === 'v' ? that.height : that.width));

        if (next !== cur) {
            that.o.change({
                prev: cur,
                cur: next
            });
        }

        window.setTimeout(function () {
            that.movingFlag = false;
            if (next !== cur) {
                that.o.afterChange({
                    prev: cur,
                    cur: next
                });
                for (var i = 0; i < that.pageEles.length; i++) {
                    var pageEle = that.pageEles[i];
                    if (i === next) {
                        pageEle.classList.add("cur");
                    } else {
                        pageEle.classList.remove("cur");
                    }
                }
            }

            // 每次翻页后重新启动定时器
            if (that.o.autoPlay) {
                that.startAutoPlay();
            }
        }, that.o.duration);
    };

    // 新增：启动定时翻页
    Fullpage.prototype.startAutoPlay = function () {
        var that = this;
        // 先清除已有的定时器，避免重复创建
        if (that.autoPlayTimer) {
            clearInterval(that.autoPlayTimer);
        }
        that.autoPlayTimer = setInterval(function () {
            that.moveNext(true); // 自动翻到下一页
        }, that.o.autoPlayInterval);
    };

    // 新增：停止定时翻页
    Fullpage.prototype.stopAutoPlay = function () {
        var that = this;
        if (that.autoPlayTimer) {
            clearInterval(that.autoPlayTimer);
            that.autoPlayTimer = null;
        }
    };

    Fullpage.prototype.movePrev = function (anim) {
        this.moveTo(this.curIndex - 1, anim);
    };
    Fullpage.prototype.moveNext = function (anim) {
        console.log(this.curIndex)
        if (this.curIndex < 1) {
            this.moveTo(this.curIndex + 1, anim);
        }
    };

    Element.prototype.fullpage = function (option) {
        return new Fullpage(this, option);
    };
}(window));