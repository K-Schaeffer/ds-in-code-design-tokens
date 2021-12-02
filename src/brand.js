const path = require('path');
const { getDirectories } = require('./utils');

function getBrands(){
   const BRANDS = [{
      source: path.resolve('properties', 'globals', '**', '*.json'),
      dest: '',
      filename: 'globals',
      brand: "",
      theme: "",
      mode: ""
   },
   {
      source: path.resolve('properties', 'motions', '**', '*.json'),
      dest: '',
      filename: 'motions',
      brand: "",
      theme: "",
      mode: ""
   }];

   getDirectories(path.resolve('properties', 'brands')).map(brand => {
      getDirectories(path.resolve('properties', 'brands', brand)).map(theme => {
         getDirectories(path.resolve('properties', 'brands', brand, theme)).map(mode => {
            BRANDS.push({
               source: path.resolve('properties', 'brands', brand, theme, mode, '**', '*.json'),
               dest: path.join(brand, theme),
               filename: mode,
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