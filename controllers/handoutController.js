const db = require("../models");
const Handout = db.handouts;
const discord = require("../utils/discord");
const Op = db.Sequelize.Op;

module.exports.create = (req, res) => {

};

module.exports.findAll = async (req, res) => {
    const handouts = await Handout.findAll();
    res.json(handouts);
};

module.exports.update = (req, res) => {

};

module.exports.delete = (req, res) => {

};

module.exports.send = (req, res) => {
    const image = req.body;
    discord.send(image.url, image.name, res);
};