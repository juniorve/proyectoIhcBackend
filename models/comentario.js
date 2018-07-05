'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var ComentarioSchema = Schema({
	titulo:String,
	descripcion:String,
	calidad:Number,
	ambiente:Number,
	comida:Number,
	relacion:Number,
	imagen:String,
	usuario: {type: Schema.ObjectId, ref:'User'},
	restaurant: {type: Schema.ObjectId, ref:'Restaurant'}

});

module.exports = mongoose.model('Comentario', ComentarioSchema);