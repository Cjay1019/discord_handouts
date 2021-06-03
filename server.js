const express = require("express");
const path = require("path");
const app = express();
const PORT = 3080;

// Define middleware here
app.use(express.json({ limit: "50mb" }));

// Sets client directory as static so the index file can reference other files
app.use(express.static(path.join(__dirname, "/client/public")));

// JSON parser for incoming request bodies
app.use(express.json());

require('dotenv').config();
require("./utils/discord");
require("./routes/api")(app);

// Serves html file when root directory is hit
app.get("/", (req, res) => res.sendFile("/client/build/index.html"));

// Listener for post request with this specific route
app.post("/test", (req, res) => {
        res.json({ success: true, message: "That's correct!" });
})

// Listens for provided port and runs server
app.listen(PORT, () => console.log(`🌎 ==> Server now on port ${PORT}!`))