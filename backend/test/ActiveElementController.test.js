const request = require('supertest');
const jwt = require('jsonwebtoken');  // Agrega esta línea
const app = require('../server');

describe('ActiveElement Controller', () => {
  // Test para la función create
  describe('POST /ruta_de_creacion', () => {

    test('should return 400 if request body is incomplete', async () => {
      const incompleteActiveElement = {
        type: 'exampleType',
        // Missing status and speed intentionally
      };

      await request(app)
        .post('/activeelements') // Reemplaza con la ruta real de creación
        .send(incompleteActiveElement)
        .expect(400); // Debes ajustar el código de estado según tu implementación
    });
  });

  // Puedes agregar más pruebas para otras funciones del controlador aquí
});
