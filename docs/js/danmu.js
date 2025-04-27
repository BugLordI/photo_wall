// /* setTimeout(() => {
//           addDanmu()
//       }, 1500); */
const danmuContainer = document.getElementById('danmu-container');

// 添加弹幕函数
function addDanmu() {
    const text = "恭喜发财！"
    // 获取选择的颜色
    const color = 'rgba(255, 0, 0, 0.7)';
    // 创建一个新的弹幕项
    const danmuItem = document.createElement('div');
    danmuItem.className = 'danmu-item';
    danmuItem.textContent = text;
    danmuItem.style.backgroundColor = color;

    // 随机设置弹幕的高度（即顶部位置）
    const randomTop = Math.floor(Math.random() * (danmuContainer.clientHeight - 40));
    danmuItem.style.top = `${randomTop}px`;

    // 将弹幕项添加到容器中
    danmuContainer.appendChild(danmuItem);

    // 计算动画时间（根据宽度调整时间）
    const containerWidth = danmuContainer.offsetWidth;
    const itemWidth = danmuItem.offsetWidth;
    const duration = (containerWidth + itemWidth) / 100; // 假设每100px需要1秒
    // 设置动画
    danmuItem.style.transform = `translateX(-${containerWidth + itemWidth}px)`;
    danmuItem.style.transition = `transform ${duration}s linear`;
    // 动画结束后移除弹幕项
    setTimeout(() => {
        danmuContainer.removeChild(danmuItem);
    }, duration * 1000);
    setTimeout(addDanmu, 1500)
}

