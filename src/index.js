const path = require('path')
const { getStyles } = require('./styles')
const { buildTokens } = require('./build')
const { registerCustomFilters, registerCustomFormats } = require('./config')

registerCustomFilters()
registerCustomFormats()

// dist/scss/globals.scss
// dist/scss/marca-a/tema-1/dark.scss

getStyles().map(async (currentStyle) => {
  const buildPath = {
    css: path.join('dist', 'css', currentStyle.dest, path.sep),
    scss: path.join('dist', 'scss', currentStyle.dest, path.sep),
  }

  await buildTokens({ currentStyle, buildPath })
})
