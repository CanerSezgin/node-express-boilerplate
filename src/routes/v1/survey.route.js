const express = require('express');
const surveyContoller = require("../../controllers/survey")

const router = express.Router();

router.get('/', surveyContoller.hi);

module.exports = router;
