const express = require('express');
const router = express.Router();

const usersController = require('../controllers/quests');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', usersController.createQuest);

router.put('/:id', usersController.updateQuest);

router.delete('/:id', usersController.deleteQuest);

module.exports = router;