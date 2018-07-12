
'use strict'

var express = require('express');
var platilloController = require('../controllers/platillo_controller');
var md_auth = require('../middlewares/authenticated');

var api= express.Router();


var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/platillo'});




api.post('/platillo',md_auth.ensureAuth,platilloController.savePlatillo);
// api.get('/getcomentarios/:usuario?',md_auth.ensureAuth,platilloController.getComentarios);
// api.get('/imagen/:id?',md_auth.ensureAuth,platilloController.getImagen);
api.get('/platillo/:restaurant',md_auth.ensureAuth,platilloController.getPlatilloxRestaurant);
// api.get('/comentariosUser/:usuario',md_auth.ensureAuth,platilloController.getComentariosxUsuario);
api.put('/platillo/:id?',md_auth.ensureAuth,platilloController.updatePlatillo);
api.delete('/platillo/:id?',md_auth.ensureAuth,platilloController.deletePlatillo);

api.post('/upload-img-platillo/:id', [md_auth.ensureAuth, md_upload],
 platilloController.uploadImage);
api.get('/get-img-platillo/:imageFile', platilloController.getImageFile);

module.exports = api;