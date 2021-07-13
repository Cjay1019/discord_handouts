const db = require("../models");
const Handout = db.handouts;
const discord = require("../utils/discord");
const Response = require("../models/Response");

module.exports.create = (req, res) => {

};

module.exports.findAll = async (req, res) => {
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

        if (updateResponse[0] !== 1) throw(new Response(1001, 200, `Could not find handout matching id ${req.body.id}`));
        res.json(new Response(200, 200, `Handout ${req.body.id} successfully updated`));
    } catch (err) {
        console.error(err);
        res.json(err);
    }
};

module.exports.delete = (req, res) => {

};

module.exports.send = (req, res) => {
    try {
        const image = req.body;
        console.log(discord)
        discord.send(image.url, image.name, res);
    } catch (err) {
        console.err(err);
        res.json(err);
    }
};