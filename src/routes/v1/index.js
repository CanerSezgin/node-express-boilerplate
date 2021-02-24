const express = require("express");
const config = require("../../config/config");
const surveyRoute = require("./survey.route");

const router = express.Router();

const setRoutes = (routes) => {
  routes.forEach((route) => {
    router.use(route.path, route.route);
  });
};

const defaultRoutes = [
  {
    path: "/survey",
    route: surveyRoute,
  },
];

const devRoutes = [];

setRoutes(defaultRoutes);

if (config.env === "development") {
  setRoutes(devRoutes);
}

module.exports = router;
