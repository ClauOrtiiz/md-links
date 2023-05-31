const {
    getAbsoluteRoute,
    findMdFilesRoutes,
    extractLinks, validatingLinks } = require('./api');
const fs = require('fs');

const mdLinks = (path, options = { validate: false }) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(path)) {
            return reject('La ruta no existe (fin)');
        }
        const route = getAbsoluteRoute(path);
        const mdFilesRoutes = findMdFilesRoutes(route);
        const links = extractLinks(mdFilesRoutes);
        if (options.validate) {
            resolve(validatingLinks(links));
        } else {
            resolve(links);
        }
    });
};

module.exports = {
    mdLinks,
};