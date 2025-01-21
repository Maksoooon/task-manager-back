const fs = require("fs");
const createError = require("http-errors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const basicAuth = require('express-basic-auth');

const { taskRouter, authRouter, projectRouter, sprintRouter } = require("./routes/index");

const app = express();

const file = fs.readFileSync("./config/swagger.json", "utf8");
app.use("/api-docs", basicAuth({
    users: {[process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD},
    challenge: true,
}), swaggerUi.serve, swaggerUi.setup(JSON.parse(file)));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('etag');

app.use("/auth/", authRouter);
app.use("/project", projectRouter);
app.use("/task", taskRouter);
app.use("/sprint", sprintRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
