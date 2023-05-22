const { mdLinks } = require('../src/index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('deberia devolcer una promesa', () => {
  //   expect (mdLinks()).toBe(typeof Promise);
  // });
  it('Debe rechazar la promesa cuando el Path no existe', () => {
    return mdLinks('/prueba/components/x.md').catch((error) => {
      expect(error).toBe('La ruta no existe');
    });
  });

});
