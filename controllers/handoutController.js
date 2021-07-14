const db = require("../models");
const Handout = db.handouts;
const discord = require("../utils/discord");
const Response = require("../models/Response");

module.exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const createResponse = await Handout.create(req.body);
        console.log(createResponse.dataValues)
        if (!createResponse.dataValues) throw (new Response(2001, 200, "Error creating new handout"));
        res.json(new Response(200, 200, `New handout created with id ${createResponse.dataValues.id}`));
    } catch (err) {
        console.log(err);
        res.json(err);
    }
};

module.exports.read = async (req, res) => {
    try {
        const handouts = await Handout.findAll();
        res.json(handouts);
    } catch (err) {
        console.error(err);
        res.json(err);
    };
};

module.exports.update = async (req, res) => {
    try {
        const updateResponse = await Handout.update(req.body.fields, {
            where: { id: req.body.id }
        });

        if (updateResponse[0] !== 1) throw (new Response(1001, 200, `Could not find handout matching id ${req.body.id}`));
        res.json(new Response(200, 200, `Handout ${req.body.id} successfully updated`));
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const deleteResponse = await Handout.destroy({
            where: { id: req.body.id }
        });

        if (deleteResponse === 0) throw (new Response(3001, 200, `Error deleting handout with id ${req.body.id}`));

        res.json(new Response(200, 200, `Successfully deleted handout with id ${req.body.id}`));
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

module.exports.send = (req, res) => {
    try {
        const image = req.body;
        discord.send(image.url, image.name, image.hideName, res);
    } catch (err) {
        console.err(err);
        res.json(err);
    }
};