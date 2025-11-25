class ProductManager {
    constructor() {
        this.arr = [];
    };

    addProduct(product) {
        this.arr.push(product);
    };

    findIndexProduct(id) {
        let index = -1;
        for (let i = 0; i < this.arr.length; i++) {
            const product = this.arr[i];
            if (id === product.id) {
                index = i;
                break;
            }
        }
        return index;
    };

    deleteProduct(id) {
        const index = this.findIndexProduct(id);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    editProduct(id) {
        const index = this.findIndexProduct(id);
        if (index !== -1) {
            return this.arr[index];
        }
        return null;
    };

    updateProduct(product) {
        const index = this.findIndexProduct(product.id);
        if (index !== -1) {
            this.arr[index] = product;
        }
    };

    filterProductType(productType) {
        if (productType === "all") {
            return this.arr;
        }
        let result = [];
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i].productType === productType) {
                result.push(this.arr[i]);
            }
        }
        return result;
    };

    searchProduct(keyword) {
        let result = [];
        for (let i = 0; i < this.arr.length; i++) {
            const product = this.arr[i];

            //chuyển keyword và product.name về chữ thường
            const keywordLowerCase = keyword.toLowerCase();
            const productNameLowerCase = product.name.toLowerCase();
            if (productNameLowerCase.indexOf(keywordLowerCase) !== -1) {
                result.push(this.arr[i]);
            }
        }
        return result;
    }
} 

export default ProductManager;