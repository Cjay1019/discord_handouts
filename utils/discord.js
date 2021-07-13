const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const Response = require("../models/Response");

// If login is successful
client.on("ready", () => console.log(`Logged in as ${client.user.tag}`));

// Login to Discord server
client.login(process.env.DISCORD_TOKEN);

module.exports = {
    send: async (url, name, res) => {
        try {
            // Find handout channel using id in env file
            const channel = await client.channels.fetch(process.env.CHANNEL);
            // Create attachment with client data
            const attachment = new MessageEmbed().setImage(url).setDescription(name);
            // Send attachment to channel
            await channel.send(attachment);
            // Send success response
            res.json(new Response(200, 200, `Attachment sent successfully to channel #${channel.name}`));
        } catch (err) {
            console.error(err);
            res.json(err);
        }
    }
}