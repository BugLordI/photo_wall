// 获取天空容器
const sky = document.querySelector('.sky');

// 随机生成星星
function createStars(count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // 设置随机位置
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        // 设置随机大小
        const size = Math.random() * 2; // 星星大小范围：0~2px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // 设置随机透明度
        const opacity = Math.random() * 0.5 + 0.5; // 透明度范围：0.5~1
        star.style.opacity = opacity;

        // 应用样式
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;

        // 添加到天空容器
        sky.appendChild(star);
    }
}

// 初始化生成星星
createStars(200); // 生成 200 颗星星

// 监听窗口大小变化，重新生成星星
window.addEventListener('resize', () => {
    sky.innerHTML = ''; // 清空现有星星
    createStars(200); // 重新生成星星
});