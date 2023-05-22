let userName = { name: "John Doe" };
let userSex = { sex: "Female" };

let user = {...userName, ...userSex };

console.log(user); // { name: "John Doe", age: 10 }


//Lee un archivo de forma asincrona
function read(path) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.error('-No se encuentra el archivo');
            return;
        }
        // Accede a la información del archivo a través del objeto 'stats'
        console.log('-Contenido del arch. es: ', data);
    });
}
read('./prueba/components/readme2.md');

//Averigua la extensión de un archivo
const ruta = './prueba/components/readme2.md'
const extension = path.extname(ruta)
console.log('-La extensión es: ', extension);

// Obtén el contenido de un directorio
function directoryContents(directory) {
    fs.readdir(directory, (error, archivos) => {
        if (error) {
            console.error('-Error: No es un directorio');
            return;
        }
        console.log('-Archivos en el directorio:', archivos);
    });
}
directoryContents('./prueba/components');

//Une dos rutas
const basicRoute = '/ruta/a';
const subRoute = 'directorio.md';
const fullRoute = path.join(basicRoute, subRoute);
console.log('-Ruta completa:', fullRoute);