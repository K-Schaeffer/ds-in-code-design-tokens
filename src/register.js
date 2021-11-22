const StyleDictionaryPackage = require('style-dictionary');

function registerConfig({ brand, mode, source, buildPath }) {

	let destination = !mode ? brand : mode

	return {
		"source": source,
		"platforms": {
			"web/css": {
				"transformGroup": "tokens-css",
				"buildPath": buildPath.css,
				"files": [{
					"destination": `${destination}.css`,
					"format": "css/variables"
				}]
			},
			"web/scss": {
				"transformGroup": "tokens-css",
				"buildPath": buildPath.scss,
				"files": [{
					"destination": `${destination}.scss`,
					"format": "scss/variables"
				}]
			},
			"js": {
				"transformGroup": "js",
				"buildPath": buildPath.js,
				"files": [{
					"destination": `${destination}.js`,
					"format": "javascript/es6"
				}]
			},
			"ts": {
				"transformGroup": "js",
				"buildPath": buildPath.ts,
				"files": [{
					"destination": `${destination}.js`,
					"format": "javascript/es6"
				}, {
					"destination": `${destination}.d.ts`,
					"format": "typescript/es6-declarations"
				}],
			}
		}
	};
}

function registerFormats() {
	StyleDictionaryPackage.registerTransformGroup({
		name: 'tokens-css',
		transforms: ["name/cti/kebab"]
	});

	StyleDictionaryPackage.registerTransformGroup({
		name: 'tokens-scss',
		transforms: ["name/cti/kebab"]
	});
}

module.exports = {
	registerConfig,
	registerFormats
}