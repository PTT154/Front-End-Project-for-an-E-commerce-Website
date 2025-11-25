class ApiServices {
    // Lấy tất cả sản phẩm từ 3 API và gộp thành một list
    getAllProducts() {
        const phonesApi = axios.get("https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/phones");
        const tvsApi = axios.get("https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/TVs");
        const accessoriesApi = axios.get("https://691600bd465a9144626e8c11.mockapi.io/accessories/accessories");

        return Promise.all([phonesApi, tvsApi, accessoriesApi])
            .then(([phonesRes, tvsRes, accessoriesRes]) => {
                return [
                    ...phonesRes.data,
                    ...tvsRes.data,
                    ...accessoriesRes.data
                ];
            });
    }

    // Thêm sản phẩm
    addProduct(product) {
        switch (product.type) {
            case "Smartphone":
                return axios.post("https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/phones", product);
            case "Television":
                return axios.post("https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/TVs", product);
            case "Accessory":
                return axios.post("https://691600bd465a9144626e8c11.mockapi.io/accessories/accessories", product);
            default:
                return Promise.reject("Unknown product type");
        }
    }

    // Xóa sản phẩm
    deleteProduct(product) {
        switch (product.type) {
            case "Smartphone":
                return axios.delete(`https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/phones/${product.id}`);
            case "Television":
                return axios.delete(`https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/TVs/${product.id}`);
            case "Accessory":
                return axios.delete(`https://691600bd465a9144626e8c11.mockapi.io/accessories/accessories/${product.id}`);
            default:
                return Promise.reject("Unknown product type");
        }
    }

    // Cập nhật sản phẩm
    updateProduct(product) {
        switch (product.type) {
            case "Smartphone":
                return axios.put(`https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/phones/${product.id}`, product);
            case "Television":
                return axios.put(`https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/TVs/${product.id}`, product);
            case "Accessory":
                return axios.put(`https://691600bd465a9144626e8c11.mockapi.io/accessories/accessories/${product.id}`, product);
            default:
                return Promise.reject("Unknown product type");
        }
    }

    // Lấy sản phẩm theo id
    getProductById(type, id) {
        switch (type) {
            case "Smartphone":
                return axios.get(`https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/phones/${id}`);
            case "Television":
                return axios.get(`https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/TVs/${id}`);
            case "Accessory":
                return axios.get(`https://691600bd465a9144626e8c11.mockapi.io/accessories/accessories/${id}`);
            default:
                return Promise.reject("Unknown product type");
        }
    }
}

export default ApiServices;
