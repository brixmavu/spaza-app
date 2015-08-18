var fs = require("fs");
var productsQty = require('./productsQty');
/*all items in Nelisa Sales History*/
exports.linesInFiles = function (fileName) {
	var productsMap = productsQty.productsSold(fileName);
	return Object.keys(productsMap);
}

/*most popular product sold*/
exports.popularProducts = function (fileName) {
	// body...
	var productsMap = productsQty.productsSold(fileName);

	var mostPopularProdct = {};
    
    var max = 0;
    for(var prop in productsMap) {
        var value = productsMap[prop];

        if(productsMap[prop] > max) {
        max = productsMap[prop];
        mostPopularProdct = {
                Product: prop,
                    Amount: max
            }
       }
    } 
    //console.log(mostPopularProdct);
    return mostPopularProdct;
}


