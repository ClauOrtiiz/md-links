/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const axios = require('axios');

//Convierte a absoluta
const getAbsoluteRoute = (route) => {
    if (path.isAbsolute(route)) {
        return route;
    }
    return path.resolve(route);
};
//Archivos MD
const findMdFilesRoutes = (route) => {
    const mdFileRoutes = [];
    if (!fs.statSync(route).isDirectory()) {
        if (path.extname(route) !== '.md') return mdFileRoutes;
        mdFileRoutes.push(route);
        return mdFileRoutes;
    }
    const directoryContent = fs.readdirSync(route);
    for (content of directoryContent) {
        const newRoute = path.join(route, content);
        const mdFiles = findMdFilesRoutes(newRoute);
        mdFileRoutes.push(...mdFiles);
    }
    return mdFileRoutes;
};

// recorrer, buscar links y retornar propiedades con el link
const extractLinks = (routes) => {
    return routes.map((route) => {
        const fileContents = fs.readFileSync(route, 'utf8');
        // eslint-disable-next-line no-useless-escape
        const regex = /\[([^\]]+)\]\(([^\)]+)\)/g;
        const links = fileContents.match(regex);
        const linkList = links.map((link) => {
            const text = link.slice(1, link.indexOf(']'));
            const href = link.slice(link.indexOf('(') + 1, -1);
            const linkProperties = {
                href: href,
                text: text,
                file: route,
            };
            return linkProperties;
        });

        return linkList;
    }).flat(1);

};

// petición GET.axios
const validatingLinks = (linkList) => {
    return new Promise((resolve) => {
        const validatedLinkList = [];
        const promises = [];

        for (const linkItem of linkList) {
            const promise = axios.get(linkItem.href)
                .then((response) => {
                    if (response.status >= 200 && response.status <= 301) {
                        validatedLinkList.push({
                            href: linkItem.href,
                            text: linkItem.text,
                            file: linkItem.file,
                            status: response.status,
                            message: 'ok',
                        });
                    } else {
                        validatedLinkList.push({
                            href: linkItem.href,
                            text: linkItem.text,
                            file: linkItem.file,
                            status: response.status,
                            message: 'fail',
                        });
                    }
                }).catch(() => {
                    validatedLinkList.push({
                        href: linkItem.href,
                        text: linkItem.text,
                        file: linkItem.file,
                        status: 400,
                        message: 'fail',
                    });
                });
            // console.log("antes de promise.all", validatedLinkList);
            promises.push(promise);

        }

        Promise.all(promises)
            .then(() => {
                resolve(validatedLinkList);
            });
    });
};




const stats  = (validatedLinkList) => {
    let uniqueSet = new Set(validatedLinkList.map((link) => link.href)).size;
    return {
        Total: validatedLinkList.length,
        Unique: uniqueSet, 
    };
};

const statsBroken  = (validatedLinkList) => {
    let uniqueSet = new Set(validatedLinkList.map((link) => link.href)).size;
    return {
        Total: validatedLinkList.length,
        Unique: uniqueSet, 
        Broken: (validatedLinkList.filter(element => element.message === 'fail')).length,
    };
};

// console.log(stats(que));

module.exports = {
    statsBroken,
    stats,
    getAbsoluteRoute,
    findMdFilesRoutes,
    extractLinks,
    validatingLinks,
};





