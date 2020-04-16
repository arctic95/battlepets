require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');

const blizzard = require('blizzard.js').initialize({
    key: process.env.BNET_CLIENT_ID,
    secret: process.env.BNET_CLIENT_SECRET,
    origin: 'eu'
});

async function example() {
    try {
        await blizzard.getApplicationToken()
            .then(response => {
                blizzard.defaults.token = response.data.access_token
            });
        const item = await blizzard.wow.item({ id: 19019 });
        console.log(item)
    } catch (err) {
        console.error(err);
    }
}

example();


const app = express();

app.set('view engine', 'ejs');

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('home');
})


app.listen(3000, () => {
    console.log('Nasłuchuje na porcie 3000');
})