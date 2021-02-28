const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require("body-parser");
const apiRoutesV1 = require('./routes/v1');
const morgan = require("morgan")
const cache = require("./lib/redis")

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
    return res.status(200).json({status: "ok", envs: process.env})
})

app.get("/get-cache", async (req, res) => {
    const { key } = req.query;
    const data = await cache.getAsync(key)
    return res.status(200).json(data)
})

app.get("/set-cache", async (req, res) => {
    const { key, val } = req.query;
    if(key && val){
        await cache.setAsync(key, JSON.stringify(val))
        return res.status(200).json({ status: "success", key, val})
    }
    return res.status(200).json({ status: "failed", key, val })
})

// Routes
app.use('/api/v1', apiRoutesV1);

module.exports = app;