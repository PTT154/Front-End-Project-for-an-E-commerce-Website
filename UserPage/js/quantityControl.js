/**
 * Thay đổi số lượng sản phẩm
 */
const plus = document.querySelector(".plus"),
    minus = document.querySelector(".minus"),
    num = document.querySelector(".num");
let a = 1;

function resetQuantity() { //Dùng function này để reset biến a (quantity) mỗi lần mở modal
    a = 1;
    num.innerText = "01";
}

plus.addEventListener("click", () => {
    a++;
    a = (a < 10) ? "0" + a : a;
    num.innerText = a;
    updateProductPrice(window.currentProductIndex, window.currentProductType); // click vào xong mới thực hiện tính toán update lại price
});
minus.addEventListener("click", () => {
    if (a > 1) {
        a--;
        a = (a < 10) ? "0" + a : a;
        num.innerText = a;
        updateProductPrice(window.currentProductIndex, window.currentProductType); // click vào xong mới thực hiện tính toán update lại price
    }
});