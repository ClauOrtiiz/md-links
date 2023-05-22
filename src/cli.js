const { mdLinks } = require('./index')

mdLinks('./prueba').then(()=>{})  
.catch((error)=>{
console.log(error);
});