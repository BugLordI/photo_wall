console.log("源码来自：https://github.com/genghenggao/niuniu/blob/3c3c930b2e66e6ebf6e1d1c09c198aa021117235/photo_wall.html#L181")
let radius = 900;
//相册展开大小
let outDom = document.getElementById("dragBox");
outDom.style.display = 'none';

let spinDom = document.getElementById("spinBox");
let spinDom2 = document.getElementById("spinBox2");
let spinDom3 = document.getElementById("spinBox3");

let aImg = spinDom.getElementsByTagName('img');
let aImg2 = spinDom2.getElementsByTagName('img');
let aImg3 = spinDom3.getElementsByTagName('img');

let aEle = [...aImg];
let aEle2 = [...aImg2];
let aEle3 = [...aImg3];

function setStyle(delayTime, dom, i, len) {
    //给元素加动画 展开
    dom.style.transform = "rotateY(" + (i * (360 / len)) + "deg) translateZ(" + radius + "px)";
    dom.style.transition = "transform 1s";
    dom.style.transitionDelay = delayTime || (len - i) / 4 + "s";
}

function init(delayTime) {
    for (let i = 0; i < aEle.length; i++) {
        setStyle(delayTime, aEle[i], i, aEle.length)
    }
    for (let i = 0; i < aEle2.length; i++) {
        setStyle(delayTime, aEle2[i], i, aEle2.length)
    }
    for (let i = 0; i < aEle3.length; i++) {
        setStyle(delayTime, aEle3[i], i, aEle3.length)
    }
}

function show() {
    outDom.style.display = '';
    //click_me_shell.style.display = 'none';
    // let audio = document.getElementById('audio');
    // audio.play();
    !function (e, t, a) {
        function r() {
            for (var e = 0; e < s.length; e++) s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e,
                1)) : (s[
                    e].y--, s[e].scale += .004, s[e].alpha -= .013, s[e].el.style.cssText = "left:" + s[
                        e].x +
                    "px;top:" + s[e].y + "px;opacity:" + s[e].alpha + ";transform:scale(" + s[e].scale +
                    "," + s[e]
                        .scale + ") rotate(45deg);background:" + s[e].color + ";z-index:99999");
            requestAnimationFrame(r)
        }

        function n() {
            var t = "function" == typeof e.onclick && e.onclick;
            e.onclick = function (e) {
                t && t(), o(e)
            }
        }

        function o(e) {
            var a = t.createElement("div");
            a.className = "heart", s.push({
                el: a,
                x: e.clientX - 5,
                y: e.clientY - 5,
                scale: 1,
                alpha: 1,
                color: c()
            }), t.body.appendChild(a)
        }

        function i(e) {
            var a = t.createElement("style");
            a.type = "text/css";
            try {
                a.appendChild(t.createTextNode(e))
            } catch (t) {
                a.styleSheet.cssText = e
            }
            t.getElementsByTagName("head")[0].appendChild(a)
        }

        function c() {
            return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math
                .random()) + ")"
        }

        var s = [];
        e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e
            .mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (
                e) {
                setTimeout(e, 1e3 / 60)
            }, i(
                ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
            ), n(), r()
    }(window, document);
    setTimeout(init, 1000);
}

function clickToShow() {
    const images = outDom.querySelectorAll('img')
    images.forEach(e => {
        e.addEventListener('click', function () {
            const foregroundPhotoContainer = document.querySelector('.foreground-photo');
            const img = document.createElement('img');
            img.src = e.src;
            img.style.opacity = 0;
            foregroundPhotoContainer.innerHTML = ''; // 清除之前的图片
            foregroundPhotoContainer.appendChild(img);
            setTimeout(() => {
                img.style.opacity = 1;
            }, 10);

            setTimeout(() => {
                img.style.opacity = 0;
            }, 4000); // 淡入后保持4秒，然后淡出
        });
    })
}

show();
clickToShow();

//鼠标滚动事件
document.onmousewheel = function (e) {
    e || e.window.event;
    let d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    //展开大小
    init(1);
}

//暂停开始旋转
function playSpin(yes) {
    spinDom.style.animationPlayState = (yes ? 'running' : 'paused');
}

function changeRotate(obj) {
    // X轴旋转0-180度
    if (tY > 180)
        tY = 180;
    if (tY < 0)
        tY = 0;
    // y轴旋转角度不限制
    obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

// x:1.2333251953125002, y:17.33559733611717
// X = 0.9333251953125, Y = 16.53559733611716
// x:1.1333251953125, y:13.335597336117171
let startX, startY, endX, endY, tX = 1.1333251953125, tY = 13.335597336117171, desX = 0, desY = 0;

//鼠标移动事件
document.onpointerdown = function (e) {
    //清除惯性定时器
    clearInterval(outDom.timer);
    e = e || ewindow.event;
    //鼠标点击位置
    startX = e.clientX, startY = e.clientY;
    this.onpointermove = function (e) {
        playSpin(false);
        //鼠标点击时 停止自动旋转//鼠标点击时 停止自动旋转
        e = e || window.event;
        //记录结束时位置
        endX = e.clientX,
            endY = e.clientY;
        //计算移动距离 并修改角度
        desX = endX - startX;
        desY = endY - startY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        changeRotate(outDom);
        startX = endX;
        startY = endY;
        console.log(`x:${tX}, y:${tY}`)
    }
    //鼠标离开时 开始自动旋转
    this.onpointerup = function (e) {
        //惯性旋转
        outDom.timer = setInterval(function () {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            changeRotate(outDom);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(outDom.timer);
                playSpin(true);
            }
        })
        this.onpointermove = this.onpointerup = null;
    }
    return false;
}

// 爱心显示
function heartShow() {
    let click_me_shell = document.getElementById("id_bg")
    if (click_me_shell) {
        const rect = click_me_shell.getBoundingClientRect();
        // 生成随机坐标（在可点击区域内）
        const randomX = Math.floor(Math.random() * rect.width) + rect.left;
        const randomY = Math.floor(Math.random() * rect.height) + rect.top;
        // 创建鼠标点击事件
        const clickEvent = new MouseEvent('click', {
            bubbles: true, // 事件是否冒泡
            cancelable: true, // 是否可以取消默认行为
            clientX: randomX, // 鼠标点击的X坐标
            clientY: randomY  // 鼠标点击的Y坐标
        });
        click_me_shell.dispatchEvent(clickEvent);
        setTimeout(heartShow, 1500)
    }
}

setTimeout(() => { heartShow() }, 1500);

// 大图片显示
const images = [];
const images1 = spinDom.querySelectorAll('img');
const images2 = spinDom2.querySelectorAll('img');
const images3 = spinDom3.querySelectorAll('img');
images1.forEach(img => {
    images.push(img.src)
});
images2.forEach(img => {
    images.push(img.src)
});
images3.forEach(img => {
    images.push(img.src)
});
const imgsArr = [...new Set(images)]
console.log(`共${imgsArr.length}张图片`)
document.addEventListener('DOMContentLoaded', () => {
    const foregroundPhotoContainer = document.querySelector('.foreground-photo');
    // 随机选择前景照片并显示
    var intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * imgsArr.length);
        const img = document.createElement('img');
        img.src = imgsArr[randomIndex];
        img.style.opacity = 0;
        foregroundPhotoContainer.innerHTML = ''; // 清除之前的图片
        foregroundPhotoContainer.appendChild(img);

        setTimeout(() => {
            img.style.opacity = 1;
        }, 10);

        setTimeout(() => {
            img.style.opacity = 0;
        }, 4000); // 淡入后保持4秒，然后淡出
    }, 5200); // 每5秒切换一次前景照片
});

const leftElement = document.getElementById('left');
const rightElement = document.getElementById('right');
const mergedArray = [...images1, ...images2, ...images3];

function getElementBounds(element) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height
    };
}

function isCollidingWithLeft(elementBounds, leftBounds) {
    return elementBounds.right > leftBounds.left && elementBounds.left <= leftBounds.right;
}

function isCollidingWithRight(elementBounds, rightBounds) {
    return elementBounds.left > rightBounds.right && elementBounds.right >= rightBounds.left;
}

function updateVisibilityLeft(elements, leftBounds) {
    elements.forEach(dom => {
        const bounds = getElementBounds(dom);
        if (isCollidingWithLeft(bounds, leftBounds)) {
            dom.style.opacity = '0';
        }
        // else if (isCollidingWithRight(bounds, rightBounds)) {
        //     dom.style.opacity = '1';
        // }
    });
}

function updateVisibilityRight(elements, rightBounds) {
    elements.forEach(dom => {
        const bounds = getElementBounds(dom);
        if (isCollidingWithRight(bounds, rightBounds)) {
            dom.style.opacity = '1';
        }
    });
}

function animateLeft(elements, leftElement) {
    const leftBounds = getElementBounds(leftElement); // 获取 #left 的边界
    updateVisibilityLeft(elements, leftBounds); // 更新可见性
    requestAnimationFrame(() => animateLeft(elements, leftElement)); // 循环调用
}

function animateRight(elements, rightElement) {
    const rightBounds = getElementBounds(rightElement);
    updateVisibilityRight(elements, rightBounds); // 更新可见性
    requestAnimationFrame(() => animateRight(elements, rightElement)); // 循环调用
}

animateLeft(mergedArray, leftElement);
animateRight(mergedArray, rightElement);