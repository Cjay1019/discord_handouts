const discord = require("../utils/discord");

module.exports = app => {
    app.post("/api/send", (req, res) => {
        const image = req.body;
        discord.send(image.url, image.name, res);
    });
}