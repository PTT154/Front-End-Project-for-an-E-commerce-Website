class CartItem {
    constructor(id, name, basePrice, img, quantity, type, color = null, storage = null, resolution = null, screenSize = null) {
        // Viết tắt các thuộc tính
        const colorMap = { Red: 'R', Purple: 'P', Black: 'B' };
        const storageMap = { '16GB + 256GB': '16', '8GB + 128GB': '8' };
        const resolutionMap = { '8K UHD': '8K', '4K UHD': '4K' };
        const screenSizeMap = { '65-inch': '65', '55-inch': '55' };

        let optionId = '';

        if (type === 'Smartphone') {
            if (color && storage) {
                optionId = `-${colorMap[color] || ''}${storageMap[storage] || ''}`;
            }
        } else if (type === 'Television') {
            if (resolution && screenSize) {
                optionId = `-${resolutionMap[resolution] || ''}${screenSizeMap[screenSize] || ''}`;
            }
        }
        // Accessory: không cần optionId

        this.id = `${id}${optionId}`;
        this.name = name;
        this.basePrice = basePrice;
        this.img = img;
        this.quantity = quantity;
        this.type = type; // 'Smartphone', 'Television', 'Accessory'

        // Smartphone
        this.color = color;
        this.storage = storage;

        // Television
        this.resolution = resolution;
        this.screenSize = screenSize;
        // Accessory: không cần thuộc tính riêng
    }

    // Tính giá cho 1 sản phẩm dựa vào các lựa chọn option
    getPrice() {
        let price = this.basePrice;

        if (this.type === 'Smartphone') {
            if (this.storage === '16GB + 256GB') price += 50;
            // Cộng thêm nếu chọn màu đặc biệt
            if (this.color === 'Red') price += 10;
            if (this.color === 'Purple') price += 5;
            // Black không cộng thêm
        }
        if (this.type === 'Television') {
            if (this.resolution === '8K UHD') price += 200;
            if (this.screenSize === '65-inch') price += 100;
            else if (this.screenSize === '55-inch') price += 50;
        }
        // Accessory: không cộng thêm

        return price;
    }

    //Tính tổng tiền
    getTotalPrice() {
        return this.getPrice() * this.quantity;
    }

    //Cập nhật option
    updateOptions({ color, storage, resolution, screenSize }) {
        if (color !== undefined) this.color = color;
        if (storage !== undefined) this.storage = storage;
        if (resolution !== undefined) this.resolution = resolution;
        if (screenSize !== undefined) this.screenSize = screenSize;
    }

    //Kiểm tra trùng item
    isSameItem(other) {
        return this.id === other.id &&
            this.type === other.type &&
            this.color === other.color &&
            this.storage === other.storage &&
            this.resolution === other.resolution &&
            this.screenSize === other.screenSize;
    }
}
export default CartItem;