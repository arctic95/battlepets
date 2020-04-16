const router = require('express').Router();
const getToken = require('../config/token').module;

router.get('/', (req, res) => {
    getToken().then( token =>{
        

        res.render('all-pets', {pets: });
    })
});

module.exports = router;