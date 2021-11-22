const path = require('path')

const { registerFormats } = require('./register');
const { getBrands } = require('./brand');
const { buildTokens } = require('./build')

/** Registra todos os formatos, templates
 * e transformers do style-dictionary */
registerFormats()

/** Busca e percorre todas as MARCAS disponíveis */
getBrands().map(async function (current) {

    /** Configura o caminho de exportação dos arquivos */
    const themePath = current.theme ? current.theme : '';
    const modePath = current.mode ? current.mode : '';
    const brandSourcePath = current.brand !== 'globals' ? 'brands' : '';
    const source = path.resolve('properties', brandSourcePath, current.brand, themePath, modePath, '**', '*.json')

    /** Define o nome da pasta onde serão salvos os tokens por brand */
    const brandPath = current.brand !== 'globals' ? current.brand : '';
    const buildPath = {
        css: path.join('dist', 'css', brandPath, themePath, path.sep),
        scss: path.join('dist', 'scss', brandPath, themePath, path.sep),
        js: path.join('dist', 'js', brandPath, themePath, path.sep),
        ts: path.join('dist', 'ts', brandPath, themePath, path.sep),
    };

    /** Build os tokens */
    await buildTokens({ current, buildPath, source });
});