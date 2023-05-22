const { getAbsoluteRoute, findMdFiles } = require('./api');
const fs = require('fs');

const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(path)) {
            return reject('La ruta no existe (fin)');
        }
        const route = getAbsoluteRoute(path);
        const mdFiles = findMdFiles(route);
        console.log(mdFiles);
    });
};

module.exports = {
    mdLinks,
};