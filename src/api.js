const fs = require('fs');
const path = require('path');

//Convierte a absoluta
const getAbsoluteRoute = (route) => {
    if (path.isAbsolute(route)) {
        return route
    }
    return path.resolve(route)
}

const findMdFiles = (route) => {

    const mdFileRoutes = [];
    if (!fs.statSync(route).isDirectory()) {
        if (path.extname(route) !== '.md') return mdFileRoutes;
        mdFileRoutes.push(route)
        return mdFileRoutes;
    }

    const directoryContent = fs.readdirSync(route);
    for (content of directoryContent) {
        const newRoute = path.join(route, content);
        const mdFiles = findMdFiles(newRoute);
        mdFileRoutes.push(...mdFiles);
    }
    return mdFileRoutes;
}



// recorrer los archivos MdfilesRoutes y buscar links. retornar links(aregl)

// ejecute el archivo( peticion http/internet)





module.exports = {
    getAbsoluteRoute,
    findMdFiles,
};