import Product from "./models/Product.js";
import ProductManager from "./controllers/ProductManager.js";
import Validation from "./utils/validation.js";
import ApiServices from "./services/apiServices.js";

const api = new ApiServices();
const manager = new ProductManager();
const validate = new Validation();

export const getEle = (id) => document.getElementById(id);

const getProductInfo = (isAdd) => {
    let id = getEle('id').value;
    let name = getEle('name').value;
    let oldPrice = getEle('oldPrice').value;
    let newPrice = getEle('newPrice').value;
    let discount = getEle('discount').value;
    let rating = getEle('rating').value;
    let desc = getEle('desc').value;
    let img = getEle('img').value;
    let productType = getEle('productType').value; 

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
    isValid &= validate.checkEmpty(oldPrice, 'tbOldPrice', '(*) Vui lòng nhập giá cũ')
        && validate.checkFloat(oldPrice, 'tbOldPrice', '(*) Vui lòng nhập giá cũ là số thực');

    // Kiểm tra giá mới
    isValid &= validate.checkEmpty(newPrice, 'tbNewPrice', '(*) Vui lòng nhập giá mới')
        && validate.checkFloat(newPrice, 'tbNewPrice', '(*) Vui lòng nhập giá mới là số thực');

    // Kiểm tra giảm giá
    isValid &= validate.checkEmpty(discount, 'tbDiscount', '(*) Vui lòng nhập giảm giá')
        && validate.checkFloat(discount, 'tbDiscount', '(*) Vui lòng nhập giảm giá là số thực');

    // Kiểm tra đánh giá
    isValid &= validate.checkEmpty(rating, 'tbRating', '(*) Vui lòng nhập đánh giá')
        && validate.checkFloat(rating, 'tbRating', '(*) Vui lòng nhập đánh giá là số thực')
        && validate.checkRating(rating, 'tbRating', '(*) Vui lòng nhập đánh giá từ 0 đến 5');

    // Kiểm tra mô tả
    isValid &= validate.checkEmpty(desc, 'tbDesc', '(*) Vui lòng nhập mô tả sản phẩm');

    // Kiểm tra ảnh
    isValid &= validate.checkEmpty(img, 'tbImg', '(*) Vui lòng nhập đường dẫn ảnh');

    // Kiểm tra loại sản phẩm
    isValid &= validate.checkProductType(productType, 'tbProductType', '(*) Vui lòng chọn loại sản phẩm');

    if (!isValid) return null;

    // Chuyển đổi dữ liệu sang đúng kiểu trước khi tạo đối tượng product
    oldPrice = Number(getEle('oldPrice').value);
    newPrice = Number(getEle('newPrice').value);
    discount = Number(getEle('discount').value);
    rating = Number(getEle('rating').value);

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

// Dùng api nên không cần local storage nữa
// // setLocalStorage
// const setLocalStorage = () => {
//     //Chuyển qua string
//     const dataString = JSON.stringify(manager.arr);
//     //Lưu vào local storage
//     localStorage.setItem("LIST_PRODUCT", dataString);
// };

// // getLocalStorage cho sản phẩm
// const getLocalStorage = () => {
//     const dataString = localStorage.getItem("LIST_PRODUCT");
//     if (!dataString) return;
//     const dataJson = JSON.parse(dataString);
//     manager.arr = dataJson;
//     renderListProduct(dataJson);
// };

// getLocalStorage();

// Thêm sản phẩm
getEle('btnAddProduct').onclick = function () {
    const product = getProductInfo(true);
    if (!product) return;
    api.addProduct(product).then(() => {
        fetchAndRenderProducts();
        getEle('btnDong').click();
    });
};

// Xóa sản phẩm
const handleDeleteProduct = (id) => {
    const product = manager.arr.find(p => p.id === id);
    if (!product) return;
    api.deleteProduct(product).then(() => {
        fetchAndRenderProducts();
    });
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
        getEle('productType').value = product.type;
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
    api.updateProduct(product).then(() => {
        fetchAndRenderProducts();
        getEle('btnDong').click();
    });
}

// Lọc loại sản phẩm
getEle('selectLoaiSP').addEventListener('change', function () {
    const productType = getEle('selectLoaiSP').value;
    const filteredProducts = manager.filterProductType(productType);
    renderListProduct(filteredProducts);
    // setLocalStorage();
});

// Tìm kiếm sản phẩm theo tên
getEle('searchName').addEventListener('keyup', function () {
    const keyword = getEle('searchName').value;
    const searchResult = manager.searchProduct(keyword);
    renderListProduct(searchResult);
    // setLocalStorage();
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
    // setLocalStorage();
    renderListProduct(manager.arr);
};

// Gọi hàm này để import dữ liệu test
// importTestData();

const fetchAndRenderProducts = () => {
    api.getAllProducts().then(products => {
        manager.arr = products.map(p => new Product(
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
        renderListProduct(manager.arr);
    });
};
fetchAndRenderProducts();