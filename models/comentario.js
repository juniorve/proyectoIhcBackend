'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var ComentarioSchema = Schema({
	descripcion:String,
	usuario: {type: Schema.ObjectId, ref:'User'},
	propuesta: {type: Schema.ObjectId, ref:'Propuesta'}

});

module.exports = mongoose.model('Comentario', ComentarioSchema);