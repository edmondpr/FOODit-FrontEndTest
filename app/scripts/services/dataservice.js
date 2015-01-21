// create a data service that provides a shopping cart
jstestApp.factory("DataService", function () {

    // create shopping cart
    var myCart = new shoppingCart("jstestApp");

    // return data object with cart
    return {
        cart: myCart
    };
});
