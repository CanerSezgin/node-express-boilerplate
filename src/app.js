const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require("body-parser");
const routes = require('./routes/v1');
const morgan = require("morgan")

const app = express();

// set security HTTP headers
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// enable cors
app.use(cors());
app.options('*', cors());

app.use(morgan('dev'))

app.get("/status", (req, res) => {
    return res.status(200).json({status: "ok"})
})
// v1 api routes
app.use('/v1', routes);

module.exports = app;