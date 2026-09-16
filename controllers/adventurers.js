const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['adventurers']
    try {
        const result = await mongodb.getDatabase().db().collection('adventurers').find();
         
        const adventurers = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(adventurers);
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while fetching the adventurers',
            error: error.message
        });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['adventurers']

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Id is not valid");
    }

    const adventurersId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDatabase().db().collection('adventurers').find({ _id: adventurersId});
        const adventurers = await result.toArray();
        res.setHeader('Content-Type', 'application/json');

        if (adventurers.length === 0) {
            return res.status(404).json("Record does not exist");
        }
        res.status(200).json(adventurers[0]);

    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while fetching the adventurers',
            error: error.message
        });
    }
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

    if (!adventurer.name || !adventurer.class || !adventurer.level || !adventurer.experience || !adventurer.race || !adventurer.gold) {
        return res.status(400).json("All fields are required");
    }

    try {
        const response = await mongodb.getDatabase().db().collection('adventurers').insertOne(adventurer);

        if (response.acknowledged > 0) {
            res.status(204).send();
        }
        else {
            res.status(400).json(response.error || 'Some error occured while creating the adventurer');
        }
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while creating the adventurer',
            error: error.message
        });
    }
    
};

const updateAdventurer= async (req, res) => {
    //#swagger.tags=['adventurers']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Id is not valid");
    }

    const adventurerId = new ObjectId(req.params.id);

    const adventurer = {
        name: req.body.name,
        class: req.body.class,
        level: req.body.level,
        experience: req.body.experience,
        race: req.body.race,
        gold: req.body.gold
    };

    if (!adventurer.name || !adventurer.class || !adventurer.level || !adventurer.experience || !adventurer.race || !adventurer.gold) {
        return res.status(400).json("All fields are required");
    }

    try {
        const response = await mongodb.getDatabase().db().collection('adventurers').replaceOne({ _id: adventurerId }, adventurer);
        
        if (response.matchedCount === 0) {
            return res.status(404).json("Record does not exist");
        }
        if (response.acknowledged > 0) {
            res.status(204).send();
        }
        else {
            res.status(400).json(response.error || 'Some error occured while updating the adventurer');
        }
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while updating the adventurer',
            error: error.message
        });
    }
    
};

const deleteAdventurer = async (req, res) => {
    //#swagger.tags=['adventurers']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Id is not valid");
    }

    const adventurerId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDatabase().db().collection('adventurers').deleteOne({ _id: adventurerId }); 
       
        if (response.deletedCount === 0) {
            return res.status(404).json("Record does not exist");
        }
        if (response.deletedCount > 0) {
            res.status(204).send();
        }
        else {
            res.status(400).json(response.error || 'Some error occured while deleting the adventurer');
    }
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while deleting the adventurer',
            error: error.message
        });
    }
    
};

module.exports = {
    getAll,
    getSingle,
    createAdventurer,
    updateAdventurer,
    deleteAdventurer
};