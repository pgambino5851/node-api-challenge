const express = require('express');

const server = express();

server.use(express.json());

const projectRouter = require("./projects/projectRouter")

const actionRouter = require("./actions/actionRouter")

server.use("/api/projects", projectRouter)

server.use("/api/actions", actionRouter)

server.get('/', logger, (req, res) => {
    res.send(`<h2>Let's get this bread.</h2>`);
  });
  
function logger(req, res, next) {
const date = new Date();
let formattedDate = date.toISOString()
console.log(`${req.method} Request to ${req.originalUrl} at ${formattedDate}`)
next();
}

module.exports = server;