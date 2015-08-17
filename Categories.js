var fs = require("fs");
var productsQty = require('./productsQty');
/*Returning Category*/
exports.categories = function (fileName) {

	var productsCategoryMap = {
		'Milk 1l': 'Dairy',
  	'Imasi': 'Dairy',
  	'Bread': 'Grain Products',
  	'Chakalaka Can': 'Canned Food',
  	'Gold Dish Vegetable Curry Can': 'Canned Food',
  	'Fanta 500ml': 'Cold drinks',
  	'Coke 500ml': 'Cold drinks',
  	'Cream Soda 500ml': 'Cold drinks',
  	'Iwisa Pap 5kg': 'Grain Products',
  	'Top Class Soy Mince': 'Dry Grocery',
  	'Shampoo 1 litre': 'Toiletries',
  	'Soap Bar': 'Toiletries',
  	'Bananas - loose': 'Fruits',
  	'Apples - loose': 'Fruits',
  	'Mixed Sweets 5s':  'Confectionery',
  	'Heart Chocolates':  'Confectionery',
  	'Rose (plastic)': 'Gifts',
  	'Valentine Cards': 'Gifts' 
	}

	var productsMap = productsQty.productsSold(fileName);
	var categoryMap = {};

	for(var productName in productsMap){
		var categoryName = productsCategoryMap[productName];
		var qty = productsMap[productName];
		if(categoryMap[categoryName] === undefined){
			categoryMap[categoryName] = 0;
		}

		categoryMap[categoryName] = categoryMap[categoryName] + qty;
	}
	//console.log(categoryMap);
	return categoryMap;
}