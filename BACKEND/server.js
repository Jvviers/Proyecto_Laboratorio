import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({
    origin: 'http://localhost:4321',
    methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});