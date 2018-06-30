'use strict'

var express = require('express');
var userController = require('../controllers/user_controller');
var md_auth = require('../middlewares/authenticated');

var api= express.Router();

api.get('/prueba_user',md_auth.ensureAuth,userController.prueba_user);
api.get('/user/:id',md_auth.ensureAuth,userController.getUser);

api.post('/saveUser',userController.saveUser);
api.post('/loginUser',userController.loginUser);

module.exports = api;