const StyleDictionaryPackage = require('style-dictionary');
const { registerConfig } = require('./register');

async function buildTokens({ current, buildPath, source }) {

   /** Configuração para gerar os tokens */
   const StyleDictionary = StyleDictionaryPackage.extend(
      registerConfig({
         brand: current.brand,
         buildPath: buildPath,
         mode: current.mode,
         source: [source]
      })
   );

   StyleDictionary.buildAllPlatforms()
}

module.exports = {
   buildTokens
}