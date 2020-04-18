require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
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

//example();

https.get('https://us.api.blizzard.com/data/wow/pet/index?namespace=static-us&locale=en_US&access_token=USEfAqtgL1f5hRE9SszMmIQpIgGafejbwJ', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).pets[5].name);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});


const app = express();

app.set('view engine', 'ejs');

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('home');
})


// app.listen(3000, () => {
//     console.log('Nasłuchuje na porcie 3000');
// })

https.createServer({
    key: fs.readFileSync('./security/server.key'),
    cert: fs.readFileSync('./security/server.cert')
}, app)
.listen(3000, () => {
    console.log('Example app listening on port 3000! Go to https://localhost:3000/');
})