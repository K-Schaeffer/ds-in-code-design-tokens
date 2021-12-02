const StyleDictionaryPackage = require('style-dictionary');

function registerConfig({ current, buildPath }) {

	return {
		"source": [current.source],
		"platforms": {
			"web/css": {
				"transformGroup": "css",
				"buildPath": buildPath.css,
				"files": [
					{
						"destination": `${current.filename}.css`,
						"format": "css/variables",
						"filter": "notIsObject"
					},
					{
						"destination": `motions.scss`,
						"format": "scss/mixins",
						"filter": "isObject"
					}
				]
			},
			"web/scss": {
				"transformGroup": "scss",
				"buildPath": buildPath.scss,
				"files": [{
					"destination": `${current.filename}.scss`,
					"format": "scss/variables"
				},
				{
					"destination": `motions.scss`,
					"format": "scss/mixins",
					"filter": "isObject"
				}]
			},
			"js": {
				"transformGroup": "js",
				"buildPath": buildPath.js,
				"files": [{
					"destination": `${current.filename}.js`,
					"format": "javascript/es6"
				}]
			},
			"ts": {
				"transformGroup": "js",
				"buildPath": buildPath.ts,
				"files": [{
					"destination": `${current.filename}.js`,
					"format": "javascript/es6"
				}, {
					"destination": `${current.filename}.d.ts`,
					"format": "typescript/es6-declarations"
				}],
			}
		}
	};
}

function registerFormats() {
	StyleDictionaryPackage.registerFormat({
		name: 'scss/mixins',
		formatter: function (dictionary, config) {
			let output = ''
			dictionary.allProperties.map(prop => {
				if(prop.attributes.category == 'switch'){
					output += `
						@if $type == switch-${prop.attributes.type} {
							transition-duration: ${prop.value.velocity};
							transition-timing-function: ${prop.value.vibe};
						}
					`
				}
				if(prop.attributes.category == 'spin'){
					output += `
						@if $type == spin-${prop.attributes.type} {
							transition-duration: ${prop.value.velocity};
							transition-timing-function: ${prop.value.vibe};
							#{$trigger} {
								transform: rotate(${prop.value.rotation});
							}
						}
					`
				}
				if(prop.attributes.category == 'expand'){
					output += `
						@if $type == spin-${prop.attributes.type} {
							transition-duration: ${prop.value.velocity};
							transition-timing-function: ${prop.value.vibe};
							#{$trigger} {
								transform: scale(${prop.value.scale});
							}
						}
					`
				}
			});

			return`
@mixin motion-token($type, $trigger){
	${output}
}
			`

		}
	})
}

function registerFilter() {

	StyleDictionaryPackage.registerFilter({
		name: 'notIsObject',
		matcher: function (prop) {
			return typeof prop.value !== 'object'
		}
	});

	StyleDictionaryPackage.registerFilter({
		name: 'isObject',
		matcher: function (prop) {
			return typeof prop.value === 'object'
		}
	});
}

module.exports = {
	registerConfig,
	registerFormats,
	registerFilter
}