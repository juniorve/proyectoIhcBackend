'use strict'

var express = require('express');
var restaurantController = require('../controllers/restaurant_controller');
var md_auth = require('../middlewares/authenticated');

var api= express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/restaurant'});



api.post('/restaurant',md_auth.ensureAuth,restaurantController.saveRestaurant);
api.get('/restaurant/:id?',md_auth.ensureAuth,restaurantController.getRestaurant);
api.get('/restaurants/:usuario?',md_auth.ensureAuth,restaurantController.getRestaurants);
api.put('/restaurant/:id?',md_auth.ensureAuth,restaurantController.updateRestaurant);
api.delete('/restaurant/:id?',md_auth.ensureAuth,restaurantController.deleteRestaurant);
api.post('/upload-img-restaurant/:id', [md_auth.ensureAuth, md_upload],
 restaurantController.uploadImage);
api.get('/get-img-restaurant/:imageFile', restaurantController.getImageFile);
module.exports = api;