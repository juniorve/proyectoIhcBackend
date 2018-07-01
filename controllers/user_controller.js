'use strict'

var bcrypt = require('bcrypt-nodejs'); // para encriptar la contraseña
var path = require('path');
var User = require('../models/user');
var jwt= require('../services/jwt');

function prueba_user(req,res){
	res.status(200).send({
		message:'Hi desde user'
	});
}

function saveUser(req,res){
	var user = new User();
	var params = req.body;

	console.log(params);

	user.name= params.name;
	user.surname= params.surname;
	user.ciudad= params.ciudad;
	user.direccion= params.direccion;
	user.celular= params.celular;
	user.descripcion= params.descripcion;
	user.role= params.role;
	user.email= params.email;
	user.password= params.password


	if(user.password){
		//encriptamos la contraseña
		bcrypt.hash(user.password,null,null, function(err,hash){
			user.password= hash;
			if(user.direccion!=null && user.celular!=null &&user.descripcion!=null && user.name!=null && user.surname!=null && user.email!=null && user.ciudad!=null  && user.password!=null){
				//guarda el usuario
				user.save((err,userStored)=>{
					 if(err){
					 	res.status(500).send({message:'Error al guardar el usuario'});
					 }else{
					 	if(!userStored){
					 		res.status(404).send({message:'No se ha registrado el usuario'});
					 	}else{
					 		res.status(200).send({user:userStored});
					 	}
					 }
				});
			}else{
				res.status(200).send({message:'Rellena todos los campos'});
			}
		});

	}else{
		res.status(200).send({message:'Introduce la contraseña'});
	}
}

	function loginUser(req,res){
		var params= req.body;

		 var email=params.email;
		 var password= params.password;

		 User.findOne({email:email.toLowerCase()},(err,user)=>{
		 	if(err){
		 		res.status(500).send({message:'Error en la peticion'});
		 	}else{
		 		if(!user){
		 			res.status(404).send({message:'el usuario no existe'});
		 		}else{

		 			bcrypt.compare(password,user.password, (err,check)=>{
		 				if(check){
		 					if(params.gethash){
		 						res.status(200).send({token: jwt.createToken(user)});
		 					}else{
		 						res.status(200).send({user});
		 					}
		 				}else{
		 					res.status(404).send({message:'contraseña incorrecta'});
		 				}

		 			});

		 		}
		 	}
		 });

	}

	function getUser(req,res){
		var id = req.params.id;

		User.findById(id,(err,user)=>{
			if(err){
				res.status(500).send({message:"Error en la base de datos"});
			}else{
				if(!user){
					res.status(404).send({message:"usuario no existe"});
				}else
				{
					res.status(200).send({user});
				}
			}

		});
	}

	function updateUser(req,res){
		var userId = req.params.id;
		var update = req.body;
	
		User.findByIdAndUpdate(userId, update,{new:true} , (err,userUpdated) =>{
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if(!userUpdated){
					res.status(404).send({message: 'No se ha actualizado el usuario'});	
				}else{
					res.status(200).send({user: userUpdated});
				}
			}
		});
	}

module.exports = {
	prueba_user,saveUser,loginUser,getUser,updateUser
}