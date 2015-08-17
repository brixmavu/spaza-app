var fs = require("fs");
var productsQty = require('./productsQty');
/*all items in Nelisa Sales History*/

/*most popular product sold*/
exports.leastPopularProducts = function (fileName) {
	// body...
	var productsMap = productsQty.productsSold(fileName);

	var leastPopularProdct = {};
    
    var max = 1000;
    for(var prop in productsMap) {
        var value = productsMap[prop];

        if(productsMap[prop] < max) {
        max = productsMap[prop];
        leastPopularProdct = {
                prodName: prop,
                    amount: max
            }
       }
    } 
    console.log(leastPopularProdct);
    return leastPopularProdct;
}
