/**
 * Reset lại options của sản phẩm khi mở lại modal
 */
function resetProductOptions() {
    // Reset storage option
    const storageOptions = document.querySelectorAll('.storage-select .storage-option'); //Lấy tất cả các option
    storageOptions.forEach((option, idx) => { //Duyệt qua từng option, idx là chỉ số của option
        option.classList.toggle('active', idx === 0); //Nếu idx = 0 (option đầu tiên) thì thêm class active, ngược lại xóa class active
    });

    // Reset color option
    const colorOptions = document.querySelectorAll('.color-select .color-option');
    colorOptions.forEach((option, idx) => {
        option.classList.toggle('active', idx === 0);
    });

    // Reset resolution option
    const resolutionOptions = document.querySelectorAll('.resolution-select .resolution-option');
    resolutionOptions.forEach((option, idx) => {
        option.classList.toggle('active', idx === 0);
    });

    // Reset screen size option
    const screenSizeOptions = document.querySelectorAll('.screen-size-select .screen-size-option');
    screenSizeOptions.forEach((option, idx) => {
        option.classList.toggle('active', idx === 0);
    });
}