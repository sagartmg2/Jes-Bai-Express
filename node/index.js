const auth = require("./auth"); // common js module
// import auth from "./auth"; // ecmascript ES module  // in react

auth.signup();
auth.login();

const { signup, login } = require("./auth");
signup();
login();

const express = require("./custom-express");
const app = express();

app.get();
app.listen();

// const express = require('express')
// import express from "express";
// import { create } from "./todos.js";

// create();
