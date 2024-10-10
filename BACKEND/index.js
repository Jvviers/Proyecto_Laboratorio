import express from 'express';
import { PORT } from './config.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json()); //middleware
app.use(cookieParser());

app.use((req, res, next) => {
    const token = req.cookies.acces_token;
    req.session = { user:null }

    try{
        const data = jwt.verify(token, SECRET_JWT_KET);
        req.session.user = data;
    } catch{}

    next(); //SEGUIR A LA SIGUIENTE RUTA O MIDDELWARE
})

app.get('/', (req, res) => {
    const token = req.cookies.acces_token;
    
    const { user } = req.session;
    res.render('index', user);
});

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});




app.post('/login', async (req, res) => {
    const { username, password } = req.body;


    try {
        const user = await UserRepository.login({ username, password });
        const token = jwt.sign(
            { id:user._id, username: user.username }, 
            SECRET_JWT_KET,
            { 
                expiresIn: '1h' 
            });
        res
        .cookie('acces_token', token, { 
            httpOnly: true,  //la cookie solo se puede acceder en el servidor
            secure: process.env.NODE_ENV === 'production', //solo se puede acceder en https OJO CON ESTO PORQUE SI TRABAJAMOS CON HTTP DUDO QUE FUNCIONE
            sameSite: 'strict', // la cookie solo se puede acceder en el mismo dominio
            maxAge: 3600000 //1 hora
         }) 
        .send({ user, token }); //NO DEVOLVER EL TOKEN A LOCALSTORAGE NI SESSION STORAGE, SIEMPRE ES MEJOR LA COOKIE 
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
});





app.post('/logout', (req, res) => {
    res
        .clearCookie('acces_token') 
        .json({ message: 'Logout succesful' });
});


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
    const { user } = req.session;
    if(!user) return res.status(403).send({error: 'unauthorized'});
    res.render('protected', user); // {_id, username }
});

