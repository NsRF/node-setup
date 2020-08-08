import express from 'express';
import '@controllers/VehicleController';
import 'reflect-metadata';
import router from './routes';

const app = express();
app.use(router);
app.get('/', (request, response) => response.json({ message: 'Hello World!' }));
app.listen(3000);

console.log('App is running!');
