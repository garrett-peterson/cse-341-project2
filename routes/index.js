const express = require('express');

const router = express.Router();

const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send(
        req.session.user !== undefined
            ? `Logged in as ${req.session.user.displayName}`
            : "Logged Out"
    );
});

router.use('/quests', require('./quests'));

router.use('/adventurers', require('./adventurers'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }

        res.redirect('/');
    });
});

module.exports = router;