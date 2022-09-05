// traemos a express
const express = require('express');
const routerApi = require('./routes');
//importar las funciones que se uilizarán
const { logErrors, errorHandler } = require('./middlewares/error.handler');
const cors = require('cors');

// creamos una aplicación
const app = express();

//le decimos el puerto en que queremos que corra la aplicación
const port = process.env.PORT || 3005;

app.use(express.json());
const whitelist = ['http://localhost:8080', 'https://myapp.co']; //'https://example.page.com'
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

//definimos la ruta
// tiene un callback que va a ejecutar la respuesta que enviemos al cliente.
//el callback siempre tiene dos parámetros "req" y "res".
app.get('/', (req, res) => {
  res.send('hola mi server en express');
});

//le decimos a la aplicación en que puesto escuchar
// además creamos un callback que nos avisará cuando esté corriendo
app.get('/nueva-ruta', (req, res) => {
  res.send('hola, esta es una nueva ruta o end-point');
});

routerApi(app);
// Utilizamos los middleware. Siempre deben ir después del routing:
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
