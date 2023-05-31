#!/usr/bin/env node
/* eslint-disable no-unused-vars */
const { mdLinks } = require('./index');
const { stats, statsBroken } = require('./api');
const { colors } = require('colors');
const process = require('process');
const opcions = process.argv;
const arg = process.argv[2];

if (opcions.includes('--validate') && opcions.includes('--stats')) {
    mdLinks(arg, { validate: true }).then((data) => {
        const result = statsBroken(data);
        console.log('Total: '.bgBrightBlue, result.Total);
        console.log('Unique:'.bgBrightCyan, result.Unique);
        console.log('Broken:'.bgBrightMagenta, result.Broken);
    })
        .catch((error) => {
            return error;

        });
} else if (opcions.includes('--validate')) {
    mdLinks(arg, { validate: true }).then((data) => {
        data.forEach(item => {
            console.log('File:   '.bgBrightWhite, item.file);
            console.log('Href:   '.bgBrightWhite, item.href);
            console.log('Message:'.bgBrightWhite, item.message);
            console.log('Status: '.bgBrightWhite, item.status);
            console.log('Text:   '.bgBrightWhite, item.text + '\n');
        });
    })
        .catch((error) => {
            return error;

        });
} else if (opcions.includes('--stats')) {
    mdLinks(arg, { validate: false }).then((data) => {
        const result = stats(data);
        console.log('Total: '.bgBrightBlue, result.Total);
        console.log('Unique:'.bgBrightCyan, result.Unique);
    })
        .catch((error) => {
            return error;
        });

} else {
    mdLinks(arg, { validate: false }).then((data) => {
        data.forEach(item => {
            console.log('File :'.bgGray, item.file);
            console.log('Href :'.bgGray, item.href);
            console.log('Text :'.bgGray, item.text + '\n');
        });
    })
        .catch((error) => {
            return error;
        });
}
