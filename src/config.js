const StyleDictionary = require('style-dictionary')

function registerConfig ({ currentStyle, buildPath }) {
  return {
    source: [currentStyle.source],
    platforms: {
      'web/css': {
        transformGroup: 'css',
        buildPath: buildPath.css,
        files: [
          {
            destination: `${currentStyle.filename}.css`,
            format: 'css/variables',
            filter: 'notIsObject'
          }
        ]
      },
      'web/scss': {
        transformGroup: 'scss',
        buildPath: buildPath.scss,
        files: [
          {
            destination: `${currentStyle.filename}.scss`,
            format: 'scss/variables',
            filter: 'notIsObject'
          },
          {
            destination: `mixins.scss`,
            format: 'scss/mixin',
            filter: 'isObject'
          }
        ]
      }
    }
  }
}

function registerCustomFilters () {
  StyleDictionary.registerFilter({
    name: 'isObject',
    matcher: function (token) {
      return typeof token.value === 'object';
    }
  });

  StyleDictionary.registerFilter({
    name: 'notIsObject',
    matcher: function (token) {
      return typeof token.value !== 'object';
    }
  })
}

function registerCustomFormats () {
  StyleDictionary.registerFormat({
    name: 'scss/mixin',
    formatter: function ({dictionary}) {
      let output = ''

      dictionary.allProperties.map(prop => {
        const { category } = prop.attributes

        switch (category) {
          case 'switch':
            output += `
  @if $type == ${category}-${prop.attributes.type} {
    transition-duration: ${prop.value.velocity};
    transition-timing-function: ${prop.value.vibe};
  }
					  `
            break
          case 'spin': 
            output += `
  @if $type == ${category}-${prop.attributes.type} {
    transition-duration: ${prop.value.velocity};
    transition-timing-function: ${prop.value.vibe};

    #{$trigger} {
      transform: rotate(${prop.value.rotation});
    }
  }
            `
            break
          case 'expand':
            output += `
  @if $type == ${category}-${prop.attributes.type} {
    transition-duration: ${prop.value.velocity};
    transition-timing-function: ${prop.value.vibe};

    #{$trigger} {
      transform: scale(${prop.value.scale});
    }
  }
            `
            break
          default:
            break
        }
      })

      return `
@mixin motion-token ($type, $trigger) {
  ${output}
}
      `
    }
  })
}

module.exports = {
  registerConfig,
  registerCustomFilters,
  registerCustomFormats
}
