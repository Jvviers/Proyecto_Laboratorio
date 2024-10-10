import express from 'express';
import { PORT } from './config.js';

const app = express();
app.use(express.json()); //middleware

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});



app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserRepository.login({ username, password });
        res.send({ user });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
});





app.post('/logout', (req, res) => {});

/* Esto puede quitarse */
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log({username, password})

    try {
        const id = await UserRepository.create({ username, password });
        res.send({ id });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }

});




app.get('/protected', (req, res) => {
    //TODO: if sesion del usuario
    res.render('protected', {username: 'user'}); //CAMBIAR POR EL USERNAME
    //TODO: else 401


});

