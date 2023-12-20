"use strict";

const http = require("http");
const dotenv = require("dotenv").config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env",
});
const dotenvExpand = require("dotenv-expand");
dotenvExpand.expand(dotenv);

const app = require("../src/app");

// generated docs
const docs = require("../src/docs/swagger");

// populate database
const populateCustomers = require("../src/services/populate-customers-database");

const port = normalizePort(process.env.PORT);
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on(`${new Date()} - error`, onError);
server.on(`${new Date()} - listening`, onListening);
console.log(`${new Date()} - Server run in port: ` + port);

populateCustomers.start();

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall != "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "Pipe " + addr : "Port " + addr.port;
  console.log("Listening on " + bind);
}
