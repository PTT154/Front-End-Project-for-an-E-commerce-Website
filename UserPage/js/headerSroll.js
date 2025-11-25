/**
 * Chuyển nền header sang đen khi kéo scroll xuống
 */
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.style.backgroundColor = 'black';
        header.style.border = 'none';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.borderBottom = 'solid 1px rgba(255, 255, 255, 0.3)';
    }
});