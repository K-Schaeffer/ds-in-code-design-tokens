const path = require('path')
const fs = require('fs')

function getDirectories (dirPath) {
  return fs.readdirSync(path.resolve(__dirname, dirPath)).map(folder => folder)
}

function getStyles () {
  const STYLES = [
    {
      source: path.resolve('tokens', 'globals', '**', '*.json'),
      dest: '',
      filename: 'globals',
      brand: "",
      theme: "",
      mode: ""
    },
    {
      source: path.resolve('tokens', 'motions', '**', '*.json'),
      dest: '',
      filename: 'motions',
      brand: "",
      theme: "",
      mode: ""
    }
  ]

  getDirectories(path.resolve('tokens', 'brands')).map(brand => {
    getDirectories(path.resolve('tokens', 'brands', brand)).map(theme => {
      getDirectories(path.resolve('tokens', 'brands', brand, theme)).map(mode => {
        STYLES.push({
          source: path.resolve('tokens', 'brands', brand, theme, mode, '**', '*.json'),
          dest: path.join(brand, theme),
          filename: mode,
          brand,
          theme,
          mode
        })
      })
    })
  })

  return STYLES
}

module.exports = {
  getStyles
}
