var fs = require("fs");
var Categories = require('./Categories');

exports.leastPopularCat =function (filename) {
  // body...
  var categoryMap = Categories.categories(filename)

  var leastCategory = {};  
  var max = 1000;

  for(var prop in categoryMap) {
      var value = categoryMap[prop];
      if(categoryMap[prop] < max) {
          max = categoryMap[prop];
          leastCategory = {
                  Category: prop,
                  Amount: max
          }
      }
  } 
  console.log(leastCategory);
  return leastCategory;
}