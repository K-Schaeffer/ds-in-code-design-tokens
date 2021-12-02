const StyleDictionaryPackage = require('style-dictionary');
const { registerConfig } = require('./register');

async function buildTokens({ current, buildPath }) {

   /** Configuração para gerar os tokens */
   const StyleDictionary = StyleDictionaryPackage.extend(
      registerConfig({
         current: current,
         buildPath: buildPath
      })
   );

   StyleDictionary.buildAllPlatforms()
}

module.exports = {
   buildTokens
}