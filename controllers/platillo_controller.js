'use strict'

var Platillo = require('../models/platillo');

var path = require('path');
var fs= require('fs');


function savePlatillo(req,res){

	var platillo = new Platillo();
	var params = req.body;
	console.log(req.body);

	platillo.nombre= params.nombre;
	platillo.imagen = params.imagen;
    platillo.restaurant= params.restaurant;


    if(platillo.nombre!=null && platillo.imagen!=null &&
		 platillo.restaurant!=null )
	{
		platillo.save((err, platilloStored) =>{
				if(err){
						res.status(500).send({ message:'Error al guardar platillo'});	
				}else{
					if(!platilloStored){
						res.status(404).send({ message:'No se ha guardado platillo'});	
					}else{
							res.status(201).send({platillo: platilloStored});  
					}
				}
		});
	}else{
		res.status(200).send({ message:'Introduce todos los datos'});
	}
}

/* 
function getPlatillo(req,res){
	
	var imagenId= req.params.id;
	

	Imagenuno.findById(imagenId, (err, imagen) => {
			if(err){
					res.status(500).send({ message:'Error en la peticion'});	
				}else{
					if(!imagen){
							res.status(404).send({ message:'No exite imagen en la base de datos'});	
					}else{
						res.status(200).send({imagen});	
					}
				}
			}			
		);
} */

/* 
function getComentarios(req,res){
	
	var usuarioId= req.params.usuario;
	
	if(!usuarioId){
		var find = Comentario.find({}).sort('_id');
	}else{
			var find = Comentario.find({usuario:usuarioId}).sort('_id');
	}

	find.populate({path:'usuario'}).exec((err, comentarios) => {
			if(err){
					res.status(500).send({ message:'Error en la peticion'});	
				}else{
					if(!comentarios){
							res.status(404).send({ message:'No hay comentarios en la base de datos'});	
					}else{
						res.status(200).send({comentarios});	
					}
				}
			}			
		);
}
 */
function getPlatilloxRestaurant(req,res){
	
	var restaurantId= req.params.restaurant;
	 
	
	if(restaurantId){
			var find = Platillo.find({restaurant:restaurantId}).sort('_id');
		//	var find = Comentario.find({}).sort('_id');
		
	} 

	find.populate({path:'restaurant'}).exec((err, platillos) => {
			if(err){
					res.status(500).send({ message:'Error en la peticion'});	
				}else{
					if(!platillos){
							res.status(404).send({ message:'No hay platillos en la base de datos'});	
					}else{
						res.status(200).send({platillos});	
					}
				}
			}			
		);
}


/* function getComentariosxUsuario(req,res){
	
	var usuarioId= req.params.usuario;
	 
	
	if(usuarioId){
			var find = Comentario.find({usuario:usuarioId}).sort('_id');
		//	var find = Comentario.find({}).sort('_id');
		
	} 

	find.populate({path:'restaurant'}).exec((err, comentarios) => {
			if(err){
					res.status(500).send({ message:'Error en la peticion'});	
				}else{
					if(!comentarios){
							res.status(404).send({ message:'No hay comentarios en la base de datos'});	
					}else{
						res.status(200).send({comentarios});	
					}
				}
			}			
		);
} */


function updatePlatillo(req,res){
	var platilloId = req.params.id;
	var update = req.body;

	Platillo.findByIdAndUpdate(platilloId, update, (err,platilloUpdated) =>{
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!platilloUpdated){
				res.status(404).send({message: 'No se ha actualizado imagen'});	
			}else{
				res.status(200).send({platillo: platilloUpdated});
			}
		}
	});
}

function deletePlatillo(req,res){
	var platilloId = req.params.id;

	Platillo.findByIdAndRemove(platilloId, (err, platilloRemoved) => {
			if(err){
				res.status(500).send({message: 'Error al eliminar imagen'});
			}else{
				if(!platilloRemoved){
					res.status(404).send({message:'El imagen no ha sido eliminado'});
				}else{
									  res.status(200).send({platillo:platilloRemoved});
					} 
					}
				});
			}



/* 
function uploadImage(req,res){
	var imagenId = req.params.id;
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

	    	Imagenuno.findByIdAndUpdate(imagenId, {imagen:file_name}, (err, imagenUpdated) =>{
	    		if(!imagenUpdated){
	    			res.status(404).send({message:"No se pudo actualizar restaurant"});
	    		}else{
	    			res.status(200).send({imagen: imagenUpdated});
	    		}

	    	});
	    }else{
	    	res.status(200).send({message:"Extensión del archivo no valido"});
	    }
	 }else{
	 	res.status(200).send({message:"No has subido ninguna imagen"});
	 }    
}
 */

 
function uploadImage(req,res){
	var imagenId = req.params.id;
	var file_name= "Imagen no subida..";

	if(req.files){
		var file_path = req.files.imagen.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

	    var ext_split = file_name.split('\.');
	    var file_ext = ext_split[1];

	    if(file_ext=='png' || file_ext=='jpg' || file_ext=='gif'){

	    	Platillo.findByIdAndUpdate(imagenId, {imagen:file_name}, (err, platilloUpdated) =>{
	    		if(!platilloUpdated){
	    			res.status(404).send({message:"No se pudo actualizar imagen"});
	    		}else{
	    			res.status(200).send({platillo: platilloUpdated});
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
	var path_file = './uploads/platillo/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:"No existe la imagen..."});
		}
	});
}



module.exports = {
    savePlatillo,
    getPlatilloxRestaurant,
    updatePlatillo,
    deletePlatillo,
	
	uploadImage,
	getImageFile
}