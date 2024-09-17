class GroceryItem {
    constructor(itemID, name, price, purchased = false) {
        this.itemID = itemID;
        this.name = name;
        this.price = price;
        this.purchased = purchased;
    }

    toString() {
        return `ItemID: ${this.itemID} Name: ${this.name} Price: $${this.price} Bought: ${this.purchased}`;
    }
}

module.exports = {GroceryItem};