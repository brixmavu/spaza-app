var fs = require("fs");
var Categories = require('./Categories');

exports.mostPopularCategory =function (filename) {
	// body...
	var categoryMap = Categories.categories(filename)

	var mostPopularCat = {};  
  var max = 0;

  for(var prop in categoryMap) {
      var value = categoryMap[prop];
      if(categoryMap[prop] > max) {
          max = categoryMap[prop];
          mostPopularCat = {
                  Category: prop,
                  Amount: max
          }
      }
  } 
  //console.log(mostPopularCat);
  return mostPopularCat;
}