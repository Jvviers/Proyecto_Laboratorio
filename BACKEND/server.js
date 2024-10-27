import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = process.env.PORT ?? 3000;
const HOST = process.env.HOST ?? 'http://localhost:4321';

app.use(cors({ origin: HOST, credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(router);

app.get('/', (req, res) => {
    res.send('<div style="display: flex-column; justify-content: center; align-items: center; width: 100%; margin-top: 32px; background-color: #fff;"><h1 style="font-size: 40px; text-align: center; color: #242424;">Bienvenido a la API de Laboratorios</h1><h3 style="font-size: 28px; text-align: center; color: #242424;">Servidor Funcionando en el puerto ' + PORT + '</h3></div>');
});

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});