const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Define middleware here
app.use(express.json({ limit: "50mb" }));

// Sets client directory as static so the index file can reference other files
const staticPath = process.env.NODE_ENV === "production" ? "build" : "public"
app.use(express.static(path.join(__dirname, `/client/${staticPath}`)));

// JSON parser for incoming request bodies
app.use(express.json());

require('dotenv').config();
require("./utils/discord");
require("./routes/api")(app);

const db = require("./models");

(async () => {
    try {
        const connection = await db.sequelize.sync();
        console.log(connection.connectionManager.config.database);
    } catch (err) {
        console.error(err);
    }
})();

// Serves html file when root directory is hit
app.get("*", (req, res) => res.sendFile("/index.html"));

// Listener for post request with this specific route
app.post("/test", (req, res) => res.json({ success: true, message: "That's correct!" }));

// Listens for provided port and runs server
app.listen(PORT, () => console.log(`🌎 ==> Server now on port ${PORT}!`))