const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const path = require("path");
const hbs = require('hbs')

module.exports = (app) => {
  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  hbs.registerPartials(path.join(__dirname, "..", 'views/partials'))
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hbs");
  app.use(express.static(path.join(__dirname, "..", "public")));
};
