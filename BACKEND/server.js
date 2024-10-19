import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(cors({ origin: 'http://localhost:4321', credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});