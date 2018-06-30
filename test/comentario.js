const     token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c2VyIjoiNWFiMTE5YzA2YWNiZTcyNTY0ZmVlZThlIiwibmFtZSI6Ikp1YW4iLCJzdXJuYW1lIjoiRG9taW5ndWV6IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYWlzIjoiUGVyw7oiLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTUyMTgyMzk0OH0.LQdWfuXlEV3xZz5qxT1nDl-pR7x2YJjHw2rJMF7TdHo';
 let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url= 'http://localhost:3977';
let idComentario;

describe('Insert a comentario: ',()=>{

	it('should insert a comentario', (done) => {
		chai.request(url)
			.post('/api/comentario').set('Authorization',token)
            .send({usuario:"59f1189fad05dd1a0037a68a",propuesta:"5ac5594b9af98a1c307522eb",descripcion:"muy bueno"})
			.end( function(err,res){
				console.log(res.body)
				idComentario=res.body.comentario._id;
				expect(res).to.have.status(200);
                expect(res.body.comentario).to.be.not.undefined;
                expect(res.body.comentario).to.have.property('_id').to.be.equal(idComentario);
				done();
			});
    });

describe('Respuesta de error al insertar nuevo comentario',()=>{

	it('se recibe un error', (done) => {
		chai.request(url)
			.post('/api/comentario')
			.send({usuario:"59f1189fad05dd1a0037a68a",propuesta:"",descripcion:"muy bueno"})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(403);
				done();
			});
	});
});

/**--------------**/

var assert = require('assert');
var request = require('supertest')
var app = require('../app.js')

var request = request("http://localhost:3977")

describe('comentarios', function() {
    
    describe('GET', function(){
        it('obtener un comentario', function(done){
            request.get('/api/comentario/'+idComentario).set('Authorization',token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    it('Should return json as data format when set Accept header to application/json', function(done){
        request.get('/api/comentario/'+idComentario).set('Authorization',token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
});
