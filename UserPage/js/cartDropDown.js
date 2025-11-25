// Đợi toàn độ HTML tải xong mới chạy code bên trong
document.addEventListener('DOMContentLoaded', function () {
    //Lất phần tử giỏ hàng .cart và nút icon giỏ hàng (thẻ a bên trong)
    const cart = document.querySelector('.support-login-search .cart');
    const cartToggle = cart.querySelector('a');

    //Toggle (thêm hoặc xóa) class .open trên cart
    cartToggle.addEventListener('click', function (e) {
        e.preventDefault(); //Ngăn không cho chuyển trang
        cart.classList.toggle('open');
    });

    // Đóng khi click ra ngoài
    document.addEventListener('click', function (e) {
        if (!cart.contains(e.target)) { //trừ vùng cart
            cart.classList.remove('open');
        }
    });

    //Đóng khi click vào View Cart hoặc Checkout button
    const cartButtons = cart.querySelectorAll('.view-cart__button, .checkout__button');
    cartButtons.forEach(button => {
        button.addEventListener('click', function () {
            cart.classList.remove('open');
        });
    });
});