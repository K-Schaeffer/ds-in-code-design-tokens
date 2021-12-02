const path = require('path')

// const { registerFormats } = require('./register');
const { registerFilter, registerFormats } = require('./register');
const { getBrands } = require('./brand');
const { buildTokens } = require('./build')

/** Registra todos os formatos, templates
 * e transformers do style-dictionary */
registerFilter();
registerFormats();

/** Busca e percorre todas as MARCAS disponíveis */
getBrands().map(async function (current) {

    const buildPath = {
        css: path.join('dist', 'css', current.dest, path.sep),
        scss: path.join('dist', 'scss', current.dest, path.sep),
        js: path.join('dist', 'js', current.dest, path.sep),
        ts: path.join('dist', 'ts', current.dest, path.sep),
    };

    /** Build os tokens */
    await buildTokens({ current, buildPath });
});