import Product from "./models/Product.js";
import ProductManager from "./controllers/ProductManager.js";
import Validation from "./utils/validation.js";

const manager = new ProductManager();
const validate = new Validation();

export const getEle = (id) => document.getElementById(id);

const getProductInfo = (isAdd) => {
    const id = getEle('id').value;
    const name = getEle('name').value;
    const oldPrice = getEle('oldPrice').value;
    const newPrice = getEle('newPrice').value;
    const discount = getEle('discount').value;
    const rating = getEle('rating').value;
    const desc = getEle('desc').value;
    const img = getEle('img').value;
    const productType = getEle('productType').value;

    let isValid = true;

    // Kiểm tra id sản phẩm
    if (isAdd) {
        isValid &= validate.checkEmpty(id, 'tbId', '(*) Vui lòng nhập id cho sản phẩm')
            && validate.checkLength(id, 'tbId', '(*) Độ dài id từ 2 đến 10 ký tự', 2, 10)
            && validate.checkExist(id, 'tbId', '(*) Id sản phẩm đã tồn tại', manager.arr);
    }

    // Kiểm tra tên sản phẩm
    isValid &= validate.checkEmpty(name, 'tbName', '(*) Vui lòng nhập tên sản phẩm');

    // Kiểm tra giá cũ
    isValid &= validate.checkEmpty(oldPrice, 'tbOldPrice', '(*) Vui lòng nhập giá cũ');

    // Kiểm tra giá mới
    isValid &= validate.checkEmpty(newPrice, 'tbNewPrice', '(*) Vui lòng nhập giá mới');

    // Kiểm tra giảm giá
    isValid &= validate.checkEmpty(discount, 'tbDiscount', '(*) Vui lòng nhập giảm giá');

    // Kiểm tra đánh giá
    isValid &= validate.checkEmpty(rating, 'tbRating', '(*) Vui lòng nhập đánh giá')
        && validate.checkRating(rating, 'tbRating', '(*) Vui lòng nhập đánh giá từ 0 đến 5');

    // Kiểm tra mô tả
    isValid &= validate.checkEmpty(desc, 'tbDesc', '(*) Vui lòng nhập mô tả sản phẩm');

    // Kiểm tra ảnh
    isValid &= validate.checkEmpty(img, 'tbImg', '(*) Vui lòng nhập đường dẫn ảnh');

    // Kiểm tra loại sản phẩm
    isValid &= validate.checkProductType(productType, 'tbProductType', '(*) Vui lòng chọn loại sản phẩm');

    if (!isValid) return null;

    const product = new Product(id, name, oldPrice, newPrice, discount, rating, desc, img, productType);

    return product;
};

const renderListProduct = (data) => {
    let contentHTML = "";
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        contentHTML += `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.oldPrice}</td>
            <td>${product.newPrice}</td>
            <td>${product.discount}</td>
            <td>${product.rating}</td>
            <td><img src="../assets/images/products/${product.img}" alt="${product.name}" style="width: 80px;"></td>
            <td style="white-space: nowrap;">
                <button class = "btn btn-info mr-1" onclick="handleEditProduct('${product.id}')" data-toggle="modal" data-target="#myModal">Edit</button>
                <button class = "btn btn-danger" onclick="handleDeleteProduct('${product.id}')">Delete</button>
            </td>
        </tr>
        `
    }
    getEle('tableDanhSach').innerHTML = contentHTML;
};

// setLocalStorage
const setLocalStorage = () => {
    //Chuyển qua string
    const dataString = JSON.stringify(manager.arr);
    //Lưu vào local storage
    localStorage.setItem("LIST_PRODUCT", dataString);
};

// getLocalStorage cho sản phẩm
const getLocalStorage = () => {
    const dataString = localStorage.getItem("LIST_PRODUCT");
    if (!dataString) return;
    const dataJson = JSON.parse(dataString);
    manager.arr = dataJson;
    renderListProduct(dataJson);
};

getLocalStorage();

// Thêm sản phẩm
getEle('btnAddProduct').onclick = function () {
    const product = getProductInfo(true);
    if (!product) return;
    manager.addProduct(product);
    renderListProduct(manager.arr);
    setLocalStorage();
    getEle('btnDong').click();
};

// Xóa sản phẩm
const handleDeleteProduct = (id) => {
    manager.deleteProduct(id);
    renderListProduct(manager.arr);
    setLocalStorage();
};

window.handleDeleteProduct = handleDeleteProduct;

// Sửa sản phẩm
const handleEditProduct = (id) => {
    const thongBaoEls = document.getElementsByClassName('sp-thongbao');
    for (let el of thongBaoEls) {
        el.style.display = 'none';
    }
    getEle('header-title').innerHTML = "Sửa Sản Phẩm";
    getEle('btnAddProduct').style.display = "none";
    getEle('btnCapNhat').style.display = "inline-block";

    const product = manager.editProduct(id);
    if (product) {
        getEle('id').disabled = true;
        getEle('id').value = product.id;
        getEle('name').value = product.name;
        getEle('oldPrice').value = product.oldPrice;
        getEle('newPrice').value = product.newPrice;
        getEle('discount').value = product.discount;
        getEle('rating').value = product.rating;
        getEle('desc').value = product.desc;
        getEle('img').value = product.img;
        getEle('productType').value = product.productType;
    }
};

// Chỉnh lại title và xóa dữ liệu cho button thêm sản phẩm
getEle('btnThem').onclick = function () {
    const thongBaoEls = document.getElementsByClassName('sp-thongbao');
    for (let el of thongBaoEls) {
        el.style.display = 'none';
    }
    getEle('header-title').innerHTML = "Thêm Sản Phẩm";
    getEle('btnAddProduct').style.display = "inline-block";
    getEle('btnCapNhat').style.display = "none";
    getEle('productForm').reset();
    getEle('id').disabled = false;
};

window.handleEditProduct = handleEditProduct;

// Cập nhật sản phẩm
getEle('btnCapNhat').onclick = function () {
    const product = getProductInfo(false);
    if (!product) return;
    manager.updateProduct(product);
    renderListProduct(manager.arr);
    setLocalStorage();
    getEle('btnDong').click();
}

// Lọc loại sản phẩm
getEle('selectLoaiSP').addEventListener('change', function () {
    const productType = getEle('selectLoaiSP').value;
    const filteredProducts = manager.filterProductType(productType);
    renderListProduct(filteredProducts);
    setLocalStorage();
});

// Tìm kiếm sản phẩm theo tên
getEle('searchName').addEventListener('keyup', function () {
    const keyword = getEle('searchName').value;
    const searchResult = manager.searchProduct(keyword);
    renderListProduct(searchResult);
    setLocalStorage();
});

// Hàm import dữ liệu từ JSON (dán vào cuối file main.js)
const importTestData = async () => {
    const files = [
        "JSON/phones.json",
        "JSON/accessories.json",
        "JSON/TVs.json"
    ];
    let allProducts = [];
    for (const file of files) {
        const res = await fetch(file);
        const data = await res.json();
        allProducts = allProducts.concat(data);
    }
    // Chuyển thành đối tượng Product
    allProducts = allProducts.map(p => new Product(
        p.id,
        p.name,
        p.oldPrice,
        p.newPrice,
        p.discount,
        p.rating,
        p.desc,
        p.img,
        p.type
    ));
    manager.arr = allProducts;
    setLocalStorage();
    renderListProduct(manager.arr);
};

// Gọi hàm này để import dữ liệu test
importTestData();