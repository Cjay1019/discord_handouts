const Controller = require("../controllers/handoutController");

module.exports = app => {
    app.post("/api/createHandout", Controller.create);

    app.get("/api/getAllHandouts", Controller.read);

    app.put("/api/updateHandout", Controller.update);

    app.post("/api/deleteHandout", Controller.delete);

    app.post("/api/sendHandout", Controller.send);
}