require("dotenv").config();
const express = require("express");
const middleware = require("./src/middleware");
const routes = require("./src/routes");

// express app
const app = express();

// all middlewares gonna use by this function
middleware(app);

// api routes
app.use("/api", routes);

module.exports = app;
