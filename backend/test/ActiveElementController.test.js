const request = require('supertest');
const jwt = require('jsonwebtoken');  // Agrega esta línea
const app = require('../server');

describe('ActiveElement Controller', () => {
  // Test para la función create
  describe('POST /ruta_de_creacion', () => {
    test('should create a new ActiveElement', async () => {
      const newActiveElement = {
        type: 'exampleType',
        status: 'exampleStatus',
        speed: 10,
      };

      // Crear un token válido para incluir en la solicitud
      const token = jwt.sign({ Username: 'adminUsername' }, process.env.JWT_SECRET);

      const response = await request(app)
        .post('/activeelements')
        .set('Authorization', `Bearer ${token}`) // Incluye el token en la solicitud
        .send(newActiveElement)
        .expect((res) => {
          expect(res.status).toBe(201);
          expect(res.body).toHaveProperty('Type', newActiveElement.type);
          expect(res.body).toHaveProperty('Status', newActiveElement.status);
          expect(res.body).toHaveProperty('Speed', newActiveElement.speed);
        });
    });

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
