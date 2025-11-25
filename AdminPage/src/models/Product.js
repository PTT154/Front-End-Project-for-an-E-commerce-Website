class Product {
    constructor(id, name, oldPrice, newPrice, discount, rating, desc, img, type) {
        this.id = id;
        this.name = name;
        this.oldPrice = oldPrice;
        this.newPrice = newPrice;
        this.discount = discount;
        this.rating = rating;
        this.desc = desc;
        this.img = img;
        this.productType = type;
    };
}

export default Product;

