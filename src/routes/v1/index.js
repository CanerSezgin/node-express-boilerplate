const express = require("express");
const config = require("../../config/config");

// Middlewares
const authCheck = require("../../middleware/authCheck");

// Routes
const authRoute = require("./auth.route");
const userRoute = require("./user.route");

const router = express.Router();

const setRoutes = (routes) => {
  routes.forEach((route) => {
    if(Array.isArray(route.middlewares) && route.middlewares.length ){
      router.use(route.path, ...route.middlewares, route.route); 
    } else {
      router.use(route.path, route.route);
    }
  });
};

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
    middlewares: [ authCheck ]
  },
];

const devRoutes = [];

setRoutes(defaultRoutes);

if (config.env === "development") {
  setRoutes(devRoutes);
}

module.exports = router;
