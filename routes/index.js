const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send("Hello World");
});

router.use('/quests', require('./quests'));
router.use('/adventurers', require('./adventurers'));

module.exports = router;