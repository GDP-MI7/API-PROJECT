const express = require('express'),
    router = express.Router()

const tweetController = require("./controller/tweet.controller")


router.route('/uploadFile').post(tweetController.signin);