const path = require('path');
const { getDirectories } = require('./utils');

function getBrands(){
   const BRANDS = [{ brand: "globals", theme: null }];

   getDirectories(path.resolve('properties', 'brands')).map(brand => {
      getDirectories(path.resolve('properties', 'brands', brand)).map(theme => {
        getDirectories(path.resolve('properties', 'brands', brand, theme)).map(mode => {
          BRANDS.push({
              brand: brand,
              theme: theme,
              mode: mode
          });
        });
      });
   });

   return BRANDS
}

module.exports = {
   getBrands
}