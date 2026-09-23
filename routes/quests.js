const express = require('express');
const router = express.Router();

const questsController = require('../controllers/quests');

const { isAuthenticated } = require("../middleware/authenticate")

router.get('/', questsController.getAll);

router.get('/:id', questsController.getSingle);

router.post('/', isAuthenticated, questsController.createQuest);

router.put('/:id', isAuthenticated, questsController.updateQuest);

router.delete('/:id', isAuthenticated, questsController.deleteQuest);

module.exports = router;