const express = require('express');
const authRouter = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const passport = require('passport');

const app = express();

app.set('view engine', 'ejs');

app.use('/auth', authRouter);


app.get('/', (req, res) => {
    res.render('home');
})


app.listen(3000, () => {
    console.log('Nasłuchuje na porcie 3000');
})