﻿//----------------------------------------------------------------
// shopping cart
//
function shoppingCart(cartName) {
    this.cartName = cartName;
    this.clearCart = false;
    this.items = [];

    // load items from local storage when initializing
    this.loadItems();
}

// load items from local storage
shoppingCart.prototype.loadItems = function () {
    var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
    if (items != null && JSON != null) {
        try {
            var items = JSON.parse(items);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.name != null && item.price != null && item.quantity != null) {
                    item = new cartItem(item.name, item.price, item.quantity);
                    this.items.push(item);
                }
            }
        }
        catch (err) {
            // ignore errors while loading...
        }
    }
}

// save items to local storage
shoppingCart.prototype.saveItems = function () {
    if (localStorage != null && JSON != null) {
        localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
    }
}

// adds an item to the cart
shoppingCart.prototype.addItem = function (name, price, quantity) {
    quantity = this.toNumber(quantity);
    if (quantity != 0) {

        // update quantity for existing item
        var found = false;
        for (var i = 0; i < this.items.length && !found; i++) {
            var item = this.items[i];
            if (item.name == name) {
                found = true;
                item.quantity = this.toNumber(item.quantity + quantity);
                if (item.quantity <= 0) {
                    this.items.splice(i, 1);
                }
            }
        }

        // new item, add now
        if (!found) {
            var item = new cartItem(name, price, quantity);
            this.items.push(item);
        }

        // save changes
        this.saveItems();
    }
}

// get the number of items currently in the cart
shoppingCart.prototype.getTotalCount = function (name) {
    var count = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (name == null || item.name == name) {
            count += this.toNumber(item.quantity);
        }
    }
    return count;
}

// get the total price for all items currently in the cart
shoppingCart.prototype.getTotalPrice = function (sku) {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (sku == null || item.sku == sku) {
            total += this.toNumber(item.quantity * item.price);
        }
    }
    return total;
}

// clear the cart
shoppingCart.prototype.clearItems = function () {
    this.items = [];
    this.saveItems();
}


shoppingCart.prototype.toNumber = function (value) {
    value = value * 1;
    return isNaN(value) ? 0 : value;
}


//----------------------------------------------------------------
// items in the cart
//
function cartItem(name, price, quantity) {
    this.name = name;
    this.price = price * 1;
    this.quantity = quantity * 1;
}

