const StyleDictionary = require('style-dictionary')
const { registerConfig } = require('./config')

async function buildTokens({ currentStyle, buildPath }) {

  const styleDictionary = StyleDictionary.extend(
    registerConfig({ currentStyle, buildPath })
  )

  styleDictionary.buildAllPlatforms()
}

module.exports = {
  buildTokens
}
