'use strict'

var express = require('express');
var restaurantController = require('../controllers/restaurant_controller');
var md_auth = require('../middlewares/authenticated');

var api= express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/restaurant'});


//imagenes
const upload = require('../services/upload');
api.post('/upload', upload);
module.exports = api;



