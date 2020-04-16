const router = require('express').Router();
const passport = require('passport');

router.get('/bnet',
    passport.authenticate('bnet'));
 
router.get('/bnet/redirect', passport.authenticate('bnet'), (req, res) => {
    res.redirect('/');
});

module.exports = router;