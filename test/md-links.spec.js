const axios = require('axios');
const { mdLinks } = require('../src/index.js');
const {
  getAbsoluteRoute,
  findMdFilesRoutes,
  extractLinks,
  validatingLinks,
  stats,
  statsBroken,
} = require('../src/api.js');


// jest.mock('axios')
// jest.spyOn(axios,'get').mockImplementation(() => Promise.resolve({status:200}))


const linkProperties = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\Claudia\\Desktop\\proyectos\\md-links\\prueba\\components01\\components01-01\\readme01-01.md',
  }
]

const statsLinks = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\Claudia\\Desktop\\proyectos\\md-links\\prueba\\components01\\components01-01\\readme01-01.md',
    status: 200,
    message: 'ok'
  }
]

const failStatsLinks = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\Claudia\\Desktop\\proyectos\\md-links\\prueba\\components01\\components01-01\\readme01-01.md',
    status: 400,
    message: 'fail'
  }
]

const arrStatsPrueb = [
  {
    href: 'https://es.wikipedia.o/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\Claudia\\Desktop\\proyectos\\md-links\\prueba\\readme0.md',
    status: 404,
    message: 'fail'
  },
  {
    href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8- 11e8 - 96ad- 9cc5593715a6.jpg',
    text: 'md-links',
    file: 'C:\\Users\\Claudia\\Desktop\\proyectos\\md-links\\prueba\\components02\\readme2.md',
    status: 200,
    message: 'ok'
  }
];
const respValidatingLinks = {
  file: 'C:\\Users\\Claudia\\Desktop\\proyectos\\md-links\\prueba\\readme0.md',
  href: 'https://es.wikipedia.o/wiki/Markdown',
  message: 'fail',
  status: 404,
}
//Función MdLinks
describe('mdLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });
  //---Ruta no existe
  it('Debe rechazar la promesa cuando el Path no existe', () => {
    return mdLinks('/prueba/components/x.md').catch((error) => {
      expect(error).toBe('La ruta no existe (fin)');
    });
  });

  it('Debe retornar propiedades del link', () => {
    return mdLinks('./prueba').then((data) => {
      // console.log(data);
      expect(data[0]).toEqual(linkProperties[0]);
    });
  });

});
//Ruta absoluta
describe('Permite convertir ruta relativa', () => {
  it('deberia ser una funcion', () => {
    expect(typeof getAbsoluteRoute).toBe('function');
  });
  it('Deberia retornar una ruta absoluta si es absoluta', () => {
    expect(getAbsoluteRoute('C://Users//Claudia//Desktop//proyectos//md-links//prueba//readme0.md')).toBe('C://Users//Claudia//Desktop//proyectos//md-links//prueba//readme0.md');
  });
});

// Retorna links de archivos .md
describe('Retorna links de archivos .md', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof findMdFilesRoutes).toBe('function');
  });
  it('Deberia extraer los archivos .md', () => {
    expect(findMdFilesRoutes(getAbsoluteRoute('./prueba/components01/components01-01/readme01-01.md'))).toEqual([getAbsoluteRoute('./prueba/components01/components01-01/readme01-01.md')]);
  });
});

// retornar propiedades con el link
describe('Retornar propiedades con el link', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof extractLinks).toBe('function');
  });

  it('Deberia mostrar los enlaces con el href, text y file', () => {
    expect(extractLinks([(getAbsoluteRoute('./prueba/components01/components01-01/readme01-01.md'))])).toEqual(linkProperties);
  });
});

// Test de validar la ruta
describe('Valida el link que se encuentra en la ruta ingresada', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof validatingLinks).toBe('function')
  });

  it('Debería devolvernos una promesa con status 200', () => {
    jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({ status: 200 }))

    validatingLinks(linkProperties)
      .then((data) => {
        expect(data).toEqual(statsLinks);
      })
  });

  it('Debería devolvernos una promesa con status 400', () => {
    jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({ status: 400 }))

    validatingLinks(linkProperties)
      .then((data) => {
        expect(data).toEqual(failStatsLinks);
      })
  });

  it('Debería devolvernos una promesa con error', () => {
    jest.spyOn(axios, 'get').mockReturnValue(Promise.reject())

    validatingLinks(linkProperties)
      .then((data) => {
        expect(data).toEqual(failStatsLinks);
      })
  });
});


// Retornar links unicos y totales
describe('Retornar links unicos y totales', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof stats).toBe('function');
  });

  it('Deberia retornar enlaces unicos y totales', () => {
    expect(stats(arrStatsPrueb)).toEqual({ Total: 2, Unique: 2 });
  });
});

// Retornar links totales, unicos y rotos
describe('Retornar links totales, unicos y rotos', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof statsBroken).toBe('function');
  });

  it('Retornar links totales, unicos y rotos', () => {
    expect(statsBroken(arrStatsPrueb)).toEqual({ Total: 2, Unique: 2, Broken: 1 });
  });
});
