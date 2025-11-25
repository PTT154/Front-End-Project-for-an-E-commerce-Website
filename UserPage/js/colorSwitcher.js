const colorButtons = document.querySelectorAll('.color-switcher__color');
colorButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const color = window.getComputedStyle(btn).backgroundColor;
        document.documentElement.style.setProperty('--primary-color', color);

        // Tự động tạo màu tối hơn (ví dụ giảm brightness)
        const darkColor = tinycolor(color).darken(10).toString();
        document.documentElement.style.setProperty('--primary-color-dark', darkColor);
    });
});

document.querySelector('.color-switcher__reset').onclick = function () {
    document.documentElement.style.setProperty('--primary-color', '#1428a0');
    document.documentElement.style.setProperty('--primary-color-dark', '#0f1e7a');
};

// Nút thu gọn/mở rộng bảng chọn màu
document.querySelector('.color-switcher__toggle').onclick = function () {
    document.querySelector('.color-switcher').classList.toggle('collapsed');
};