const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('quests').find();
    result.toArray().then((quests) => {
        res.toHeader('Content-Type', 'application/json');
        res.status(200).json(quests[0]);
    });
};

const getSingle = async (req, res) => {
    const questId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('quests').find({ _id: questId});
    result.toArray().then((quests) => {
        res.toHeader('Content-Type', 'application/json');
        res.status(200).json(quests[0]);
    })
};

const createQuest = async (req, res) => {
    const quest = {
        name: req.body.name,
        description: req.body.description,
        difficulty: req.body.difficulty,
        location: req.body.location,
        reward: req.body.reward,
        reccomendedLevel: req.body.reccomendedLevel,
        questGiver: req.body.questGiver
    };
    const response = await mongodb.getDatabase().db().collection('quests').insertOne(quest);

     if (response.acknowledged > 0) {
        res.status(204).send();
    }
    else {
        res.status(400).json(response.error || 'Some error occured while creating the quest');
    }
};

const updateQuest = async (req, res) => {
    const questId = new ObjectId(req.params.id);
    const quest = {
        name: req.body.name,
        description: req.body.description,
        difficulty: req.body.difficulty,
        location: req.body.location,
        reward: req.body.reward,
        reccomendedLevel: req.body.reccomendedLevel,
        questGiver: req.body.questGiver
    };
    const response = await mongodb.getDatabase().db().collection('quests').replaceOne({ _id: questId });

    if (response.acknowledged > 0) {
        res.status(204).send();
    }
    else {
        res.status(400).json(response.error || 'Some error occured while updating the quest');
    }
};

const deleteQuest = async (req, res) => {
    const questId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('quests').deleteOne({ _id: questId }); 

    if (response.deletedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(400).json(response.error || 'Some error occured while deleting the quest');
    }
};

module.exports = {
    getAll,
    getSingle,
    updateQuest,
    createQuest,
    deleteQuest
};