// importing app components
const express = require("express");
const app = express();
require("dotenv").config();

// this will have the environment and configuration for the application

// function that helps with connecting to database
const connectToDB = require("./core/db").connectToDB;

// function that helps to start the server
const initServer = require("./core/server").initServer;

// connecting to database
connectToDB();

// initialising server
initServer(app);

module.exports.server = app;