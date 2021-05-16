const express = require('express');
const userController = require("../../controllers/user")

const router = express.Router();

router.get('/details', userController.getUserDetails);

module.exports = router;
