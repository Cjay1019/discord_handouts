const Controller = require("../controllers/handoutController");

module.exports = app => {
    app.post("/api/sendHandout", Controller.send);

    app.get("/api/getAllHandouts", Controller.findAll);
}