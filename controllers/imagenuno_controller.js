'use strict'

var Imagenuno = require('../models/imagenuno');

var path = require('path');
var fs= require('fs');


function saveImagen(req,res){

	var imagenuno = new Imagenuno();
	var params = req.body;
	console.log(req.body);

	imagenuno.nombre= params.nombre;
	imagenuno.descripcion= params.descripcion;
	imagenuno.imagen = params.imagen;
    imagenuno.user= params.user;
    imagenuno.restaurant= params.restaurant;


    if(imagenuno.nombre!=null && imagenuno.descripcion!=null && imagenuno.imagen!=null &&
         imagenuno.user!=null &&
		 imagenuno.restaurant!=null )
	{
		imagenuno.save((err, imagenStored) =>{
				if(err){
						res.status(500).send({ message:'Error al guardar imagen'});	
				}else{
					if(!imagenStored){
						res.status(404).send({ message:'No se ha guardado imagen'});	
					}else{
							res.status(201).send({imagen: imagenStored});  
					}
				}
		});
	}else{
		res.status(200).send({ message:'Introduce todos los datos'});
	}
}


function getImagen(req,res){
	
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
}

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
function getImagenesxRestaurant(req,res){
	
	var restaurantId= req.params.restaurant;
	 
	
	if(restaurantId){
			var find = Imagenuno.find({restaurant:restaurantId}).sort('_id');
		//	var find = Comentario.find({}).sort('_id');
		
	} 

	find.populate({path:'usuario'}).exec((err, imagenes) => {
			if(err){
					res.status(500).send({ message:'Error en la peticion'});	
				}else{
					if(!imagenes){
							res.status(404).send({ message:'No hay imagenes en la base de datos'});	
					}else{
						res.status(200).send({imagenes});	
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


function updateImagen(req,res){
	var imagenId = req.params.id;
	var update = req.body;

	Imagenuno.findByIdAndUpdate(imagenId, update, (err,imagenUpdated) =>{
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!imagenUpdated){
				res.status(404).send({message: 'No se ha actualizado imagen'});	
			}else{
				res.status(200).send({imagen: imagenUpdated});
			}
		}
	});
}

function deleteImagen(req,res){
	var imagenId = req.params.id;

	Imagenuno.findByIdAndRemove(imagenId, (err, imagenRemoved) => {
			if(err){
				res.status(500).send({message: 'Error al eliminar imagen'});
			}else{
				if(!imagenRemoved){
					res.status(404).send({message:'El imagen no ha sido eliminado'});
				}else{
									  res.status(200).send({imagen:imagenRemoved});
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

	    	Imagenuno.findByIdAndUpdate(imagenId, {imagen:file_name}, (err, imagenUpdated) =>{
	    		if(!imagenUpdated){
	    			res.status(404).send({message:"No se pudo actualizar imagen"});
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


function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/imagen/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:"No existe la imagen..."});
		}
	});
}



module.exports = {
    saveImagen,
    updateImagen,
    getImagen,
    getImagenesxRestaurant,
	deleteImagen,
	
	uploadImage,
	getImageFile
}