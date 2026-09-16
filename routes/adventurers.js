const express = require('express');
const router = express.Router();

const adventurersController = require('../controllers/adventurers');

router.get('/', adventurersController.getAll);

router.get('/:id', adventurersController.getSingle);

router.post('/', adventurersController.createAdventurer);

router.put('/:id', adventurersController.updateAdventurer);

router.delete('/:id', adventurersController.deleteAdventurer);

module.exports = router;