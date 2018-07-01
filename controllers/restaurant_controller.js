'use strict'

var Restaurant = require('../models/restaurant');

var path = require('path');
var fs= require('fs');


function saveRestaurant(req,res){
	var restaurant = new Restaurant();
	var params = req.body;

	//console.log(params);
	restaurant.nombre= params.nombre;
	restaurant.descripcion= params.descripcion;
	restaurant.horario= params.horario;
	restaurant.tipo_cocina= params.tipo_cocina;
	restaurant.direccion= params.direccion;
	restaurant.capacidad= params.capacidad;
	restaurant.imagen= params.imagen;
	restaurant.user= params.user;

	if(restaurant.nombre!=null && restaurant.capacidad!=null && restaurant.descripcion!=null && restaurant.horario!=null && restaurant.tipo_cocina!=null
		&& restaurant.direccion!=null && restaurant.imagen!=null && restaurant.user!=null){

		restaurant.save((err, restaurantStored) =>{
				if(err){
						res.status(500).send({ message:'Error al guardar restaurant'});	
				}else{
					if(!restaurantStored){
						res.status(404).send({ message:'No se ha guardado restaurant'});	
					}else{
							res.status(201).send({restaurant: restaurantStored});  
					}
				}
		});
	}else{
		res.status(400).send({ message:'Introduce todos los datos'});
	}
}

function getRestaurant(req,res){
	
	var restaurantId= req.params.id;

	Restaurant.findById(restaurantId, (err, restaurant) => {
			if(err){
					res.status(500).send({ message:'Error en la peticion'});	
				}else{
					if(!restaurant){
							res.status(404).send({ message:'No hay restaurants en la base de datos'});	
					}else{
						res.status(200).send({restaurant});	
					}
				}
			}			
		);
}


function getRestaurants(req,res){
	
	var usuarioId= req.params.usuario;
	
	if(!usuarioId){
		var find = Restaurant.find({}).sort('_id');
	}else{
			var find = Restaurant.find({user:usuarioId}).sort('_id');
	} 

	find.populate({path:'user'}).exec((err, restaurants) => {
			if(err){
					res.status(500).send({ message:'Error en la peticion'});	
				}else{
					if(!restaurants){
							res.status(404).send({ message:'No hay restaurants en la base de datos'});	
					}else{
						res.status(200).send({restaurants});	
					}
				}
			});
}


function updateRestaurant(req,res){
	var restaurantId = req.params.id;
	var update = req.body;

	Restaurant.findByIdAndUpdate(restaurantId, update, (err,restaurantUpdated) =>{
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!restaurantUpdated){
				res.status(404).send({message: 'No se ha actualizado el restaurant'});	
			}else{
				res.status(200).send({restaurant: restaurantUpdated});
			}
		}
	});
}

function deleteRestaurant(req,res){
		var restaurantId = req.params.id;

		Restaurant.findByIdAndRemove(restaurantId, (err, restaurantRemoved) => {
				if(err){
					res.status(500).send({message: 'Error al eliminar restaurant'});
				}else{
					if(!restaurantRemoved){
						res.status(404).send({message:'El restaurant no ha sido eliminada'});
					}else{
	    		          				res.status(200).send({restaurant:restaurantRemoved});
						} 
						}
					});
				}

function uploadImage(req,res){
	var restaurantId = req.params.id;
	var file_name= "Imagen no subida..";

	if(req.files){
	
		console.log(req.files);
		var file_path = req.files.imagen.path;
		var file_split = file_path.split(path.sep);
		var file_name = file_split[2];
		console.log(file_name);
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];


	    if(file_ext=='png' || file_ext=='jpg' || file_ext=='gif'){

	    	Restaurant.findByIdAndUpdate(restaurantId, {imagen:file_name}, (err, restaurantUpdated) =>{
	    		if(!restaurantUpdated){
	    			res.status(404).send({message:"No se pudo actualizar restaurant"});
	    		}else{
	    			res.status(200).send({restaurant: restaurantUpdated});
	    		}

	    	});
	    }else{
	    	res.status(200).send({message:"Extensión del archivo no valido"});
	    }
	 }else{
	 	res.status(200).send({message:"No has subido ninguna imagen"});
	 }    
}

function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/restaurant/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:"No existe la imagen..."});
		}
	});
}


module.exports = {
	saveRestaurant,
	getRestaurant,
	getRestaurants,
	updateRestaurant,
	deleteRestaurant,

	//para imagenes
	uploadImage,
	getImageFile
};