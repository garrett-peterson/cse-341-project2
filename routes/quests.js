const express = require('express');
const router = express.Router();

const questsController = require('../controllers/quests');

router.get('/', questsController.getAll);

router.get('/:id', questsController.getSingle);

router.post('/', questsController.createQuest);

router.put('/:id', questsController.updateQuest);

router.delete('/:id', questsController.deleteQuest);

module.exports = router;