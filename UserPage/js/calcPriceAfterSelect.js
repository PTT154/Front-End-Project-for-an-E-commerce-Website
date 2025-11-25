/**
 * Tính lại giá tiền điện thoại khi click vào các select
 */
document.querySelectorAll('.storage-select .storage-option').forEach(function (tab) {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.storage-select .storage-option').forEach(function (t) {
            t.classList.remove('active');
        });
        tab.classList.add('active');
        updateProductPrice(window.currentProductIndex, window.currentProductType); // click vào xong mới thực hiện tính toán update lại price
        //Hai biến này được khai báo và lưu dữ liệu bên file index.js
    });
});

/**
 * Xử lý chọn màu sắc cho điện thoại
 */
document.querySelectorAll('.color-select .color-option').forEach(function (tab) {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.color-select .color-option').forEach(function (t) {
            t.classList.remove('active');
        });
        tab.classList.add('active');
        updateProductPrice(window.currentProductIndex, window.currentProductType);
    });
});


// Xử lý chọn độ phân giải cho TV
document.querySelectorAll('.resolution-select .resolution-option').forEach(function (tab) {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.resolution-select .resolution-option').forEach(function (t) {
            t.classList.remove('active');
        });
        tab.classList.add('active');
        updateProductPrice(window.currentProductIndex, window.currentProductType);
    });
});

// Xử lý chọn kích thước màn hình cho TV
document.querySelectorAll('.screen-size-select .screen-size-option').forEach(function (tab) {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.screen-size-select .screen-size-option').forEach(function (t) {
            t.classList.remove('active');
        });
        tab.classList.add('active');
        updateProductPrice(window.currentProductIndex, window.currentProductType);
    });
});