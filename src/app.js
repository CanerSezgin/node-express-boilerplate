const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cache = require("./lib/redis");
const authService = require("./services/auth.service");

const apiRoutesV1 = require("./routes/v1");
const viewRoutes = require("./routes/view");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(cookieParser());
app.use(
  session({
    secret: "very secret key",
    cookie: {
      maxAge: 10 * 60 * 1000,
      secure: false, // true in prod
    },
    saveUninitialized: false,
    resave: false,
    unset: "destroy",
  })
);

// enable cors
app.use(
  cors({
    origin: ["http://localhost:8080", "https://localhost:8080"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

// Init passport
app.use(authService.passport.initialize());
app.use(authService.passport.session());

// Configure view engine to render EJS templates.
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/status", (req, res) => {
  return res.status(200).json({ status: "ok", envs: process.env });
});



/* app.get("/get-cache", async (req, res) => {
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
}) */

// Routes
app.use("/", viewRoutes);
app.use("/api/v1", apiRoutesV1);

module.exports = app;
