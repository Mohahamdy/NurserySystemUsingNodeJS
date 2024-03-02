//import express,moragn package
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
//const cors = require("cors");

const teacherRouter = require("./Route/teacherRoute");
const childRouter = require("./Route/childRouter");
const classRouter = require("./Route/classRouter");
const loginRouter = require("./Route/authenticationRoute");
const authMW = require("./MW/Auth/authenticationMW");

//create server
const server = express();

//open connection
mongoose
  .connect("mongodb://127.0.0.1:27017/pd")
  .then(() => {
    console.log("DB connected ....");
    server.listen(8081, () => {
      console.log("I am listenning .......!");
    });
  })
  .catch((error) => {
    console.log(error + "  DB problem");
  });
//server listen to specific port number

// //cors gives access for all domains or specefic domain
// server.use(cors());

//-----------------> first MW(logging) <---------//

// server.use(logger("tiny"));
server.use(logger(":url :method"));

// server.use((req, res, next) => {
//   //   console.log("Data", req.url, req.method);
//   next();
// });

//-----------------> Settings <---------//
server.use(express.json());

//-----------------> Routes (endpoints) <---------//
server.use(loginRouter);
server.use(authMW);
server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);

//-----------------> NotFound MW <---------//
server.use((req, res) => {
  res.status(404).json({ data: "Not Founded" });
});

//-----------------> Error MW <---------//
server.use((error, req, res, next) => {
  console.log("Error" + error);
  res.status(error.status || 500).json({ data: "error : " + error });
});
