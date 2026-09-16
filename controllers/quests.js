const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['quests']
    try {
        const result = await mongodb.getDatabase().db().collection('quests').find();

        const quests = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(quests);
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while fetching the quests',
            error: error.message
        });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['quests']
    
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Id is not valid");
    }

    const questId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDatabase().db().collection('quests').find({ _id: questId});
        const quests = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        if (quests.length === 0) {
            return res.status(404).json("Record does not exist");
        }

        res.status(200).json(quests[0]);

    } catch(error) {
        res.status(500).json({
            message: 'Some error occurred while fetching the quest',
            error: error.message
        });
    }
};

const createQuest = async (req, res) => {
    //#swagger.tags=['quests']
    const quest = {
        name: req.body.name,
        description: req.body.description,
        difficulty: req.body.difficulty,
        location: req.body.location,
        reward: req.body.reward,
        reccomendedLevel: req.body.reccomendedLevel,
        questGiver: req.body.questGiver
    };

    if (!quest.name || !quest.description || !quest.difficulty || !quest.location || !quest.reward || !quest.reccomendedLevel || !quest.questGiver) {
        return res.status(400).json("All fields are required");
    }

    try {
        const response = await mongodb.getDatabase().db().collection('quests').insertOne(quest);

        if (response.acknowledged > 0) {
            res.status(204).send();
        }
        else {
            res.status(400).json(response.error || 'Some error occured while creating the quest');
        }

    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while creating the quest',
            error: error.message
        });
    }
};

const updateQuest = async (req, res) => {
    //#swagger.tags=['quests']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Id is not valid");
    }

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

    if (!quest.name || !quest.description || !quest.difficulty || !quest.location || !quest.reward || !quest.reccomendedLevel || !quest.questGiver) {
        return res.status(400).json("All fields are required");
    }

    try {
        const response = await mongodb.getDatabase().db().collection('quests').replaceOne({ _id: questId }, quest);

        if (response.matchedCount === 0) {
            return res.status(404).json("Record does not exist");
        }
        if (response.acknowledged > 0) {
            res.status(204).send();
        }
        else {
            res.status(400).json(response.error || 'Some error occured while updating the quest');
        }
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while updating the quest',
            error: error.message
        });
    }
};

const deleteQuest = async (req, res) => {
    //#swagger.tags=['quests']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Id is not valid");
    }

    const questId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDatabase().db().collection('quests').deleteOne({ _id: questId }); 

        if (response.deletedCount === 0) {
            return res.status(404).json("Record does not exist");
        }

        if (response.deletedCount > 0) {
            res.status(204).send();
        }
        else {
            res.status(400).json(response.error || 'Some error occured while deleting the quest');
        }
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while deleting the quest',
            error: error.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    updateQuest,
    createQuest,
    deleteQuest
};