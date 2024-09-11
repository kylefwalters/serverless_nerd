class GroceryItem {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.bought = false;
    }

    toString() {
        return `Name: ${this.name} Quantity: ${this.quantity} Price: $${this.price} Bought: ${this.bought}`;
    }
}

module.exports = {GroceryItem};