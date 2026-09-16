const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['adventurers']
    const result = await mongodb.getDatabase().db().collection('adventurers').find();
    result.toArray().then((adventurers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(adventurers);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['adventurers']
    const adventurersId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('adventurers').find({ _id: adventurersId});
    result.toArray().then((adventurers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(adventurers[0]);
    })
};

const createAdventurer = async (req, res) => {
    //#swagger.tags=['adventurers']
    const adventurer = {
        name: req.body.name,
        class: req.body.class,
        level: req.body.level,
        experience: req.body.experience,
        race: req.body.race,
        gold: req.body.gold
    };
    const response = await mongodb.getDatabase().db().collection('adventurers').insertOne(adventurer);

     if (response.acknowledged > 0) {
        res.status(204).send();
    }
    else {
        res.status(400).json(response.error || 'Some error occured while creating the adventurer');
    }
};

const updateAdventurer= async (req, res) => {
    //#swagger.tags=['adventurers']
    const adventurerId = new ObjectId(req.params.id);
    const adventurer = {
        name: req.body.name,
        class: req.body.class,
        level: req.body.level,
        experience: req.body.experience,
        race: req.body.race,
        gold: req.body.gold
    };
    const response = await mongodb.getDatabase().db().collection('adventurers').replaceOne({ _id: adventurerId }, adventurer);

    if (response.acknowledged > 0) {
        res.status(204).send();
    }
    else {
        res.status(400).json(response.error || 'Some error occured while updating the adventurer');
    }
};

const deleteAdventurer = async (req, res) => {
    //#swagger.tags=['adventurers']
    const adventurerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('adventurers').deleteOne({ _id: adventurerId }); 

    if (response.deletedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(400).json(response.error || 'Some error occured while deleting the adventurer');
    }
};

module.exports = {
    getAll,
    getSingle,
    createAdventurer,
    updateAdventurer,
    deleteAdventurer
};