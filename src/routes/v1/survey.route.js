const express = require('express');
const surveyContoller = require("../../controllers/survey")

const router = express.Router();

router.post('/', surveyContoller.hi);

module.exports = router;
