const Controller = require("../controllers/handoutController");

module.exports = app => {
    app.post("/api/sendHandout", Controller.send);

    app.post("/api/updateHandout", Controller.update);

    app.get("/api/getAllHandouts", Controller.findAll);
}