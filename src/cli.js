const { mdLinks } = require('./index');
const { stats, statsBroken } = require('./api');
const process = require('process');
const opcions = process.argv;
const arg = process.argv[2];

if (opcions.includes('--validate') && opcions.includes('--stats')) {
    mdLinks(arg, { validate: true }).then((data) => {
        const result = statsBroken(data);
        console.log('Total: ', result.Total);
        console.log('Unique:', result.Unique);
        console.log('Broken:', result.Broken);
    })
        .catch((error) => {
            return error;

        });
} else if (opcions.includes('--validate')) {
    mdLinks(arg, { validate: true }).then((data) => {
        data.forEach(item => {
            console.log('File:   ', item.file); 
            console.log('Href:   ',item.href ); 
            console.log('Message:',item.message);
            console.log('Status: ',item.status); 
            console.log('Text:   ',item.text + '\n'); 
        });
    })
        .catch((error) => {
            return error;

        });
} else if (opcions.includes('--stats')) {
    mdLinks(arg, { validate: false }).then((data) => {
        const result = stats(data);
        console.log('Total: ', result.Total);
        console.log('Unique:', result.Unique);
    })
        .catch((error) => {
            return error;
        });

} else {
    mdLinks(arg, { validate: false }).then((data) => {
        data.forEach(item => {
            console.log('File:',item.file);
            console.log('Href:',item.href);
            console.log('Text:',item.text + '\n');
        });
    })
        .catch((error) => {
            return error;
        });
}
