const express = require('express');
const router = express.Router();

const adventurersController = require('../controllers/adventurers');

const { isAuthenticated } = require("../middleware/authenticate")

router.get('/', adventurersController.getAll);

router.get('/:id', adventurersController.getSingle);

router.post('/', isAuthenticated, adventurersController.createAdventurer);

router.put('/:id', isAuthenticated, adventurersController.updateAdventurer);

router.delete('/:id', isAuthenticated, adventurersController.deleteAdventurer);

module.exports = router;