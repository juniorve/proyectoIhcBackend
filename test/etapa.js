let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url= 'http://localhost:3977';
const     token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c2VyIjoiNWFiMTE5YzA2YWNiZTcyNTY0ZmVlZThlIiwibmFtZSI6Ikp1YW4iLCJzdXJuYW1lIjoiRG9taW5ndWV6IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYWlzIjoiUGVyw7oiLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTUyMTgyMzk0OH0.LQdWfuXlEV3xZz5qxT1nDl-pR7x2YJjHw2rJMF7TdHo';
let idEtapa;

describe('Insertar una etapa con exito: ',()=>{

	it('should insert a etapa', (done) => {
		chai.request(url)
			.post('/api/etapa').set('Authorization',token)
            .send({evento:"5aa1e2c07129f211d4777a79", color:"",tipo:"",
            descripcion:"se investiga", nom_etapa:"Investigaciòn"})
			.end( function(err,res){
                console.log(res.body)
                idEtapa=res.body.etapa._id;
                expect(res).to.have.status(200);        
                expect(res.body.etapa).to.be.not.undefined;
                expect(res.body.etapa).to.have.property('_id').to.be.equal(idEtapa);
                done();
			});
    });

    
describe('/PUT/api/evento/:id evento', () => {
    it('modificar un evento enviando nuevos datos e id', (done) => {
             chai.request(url)
              .put('/api/etapa/5ac555b89af98a1c307522e4').set('Authorization',token)
              .send({ nom_etapa:"Investigaciòn",descripcion:"se da la investigaciòn", tipo:"",
              color:"",evento:"5aa1e2c07129f211d4777a79"})
              .end((err, res) => {
                  console.log(res.body);
              expect(res).to.have.status(200);
              expect(res.body.etapa).to.have.property('descripcion').to.be.equal('se da la investigaciòn');
              done();
              });
    });
});

describe('/DELETE/:id etapa', () => {
    it('eliminar una etapa mediante su id', (done) => {
        chai.request(url)
              .delete('/api/etapa/'+idEtapa).set('Authorization',token)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.etapa).to.have.property('_id').to.be.equal(idEtapa);
                done();
              });
        });
}); 

/* ///

it('almacenar una etapa', function(done){
    chai.request(url)
    .post('/api/etapa').set('Authorization',token)
    .send({nom_evento:"Automatizacion Tecnologicas", tipo_evento: "maraton", 
    fech_hora_ini: "", fech_hora_fin: "", max_asistentes:10,descripcion:"",foto_evento:""
    ,estado:"",user:"5ab119c06acbe72564feee8e"})
    .expect(200)
    .end(function(err, res) {

        expect(res.body.token).to.be.not.undefined;
        expect(res.body.etapa).to.be.not.undefined;
        expect(res.body.etapa.nom_evento).to.be.eql('Automatizacion Tecnologicas');

        done();
    })
});
///
      */
});


describe('Error en insercion de un evento ',()=>{

	it('should receive an error', (done) => {
		chai.request(url)
			.post('/api/etapa')
			.send({evento:"5aa1e2c07129f211d4777a79", color:12,tipo:"",
            descripcion:"se investiga", nom_etapa:"Investigaciòn"})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(403);
				done();
			});
	});

});


/* --------------- */

var assert = require('assert');
var request = require('supertest')
var app = require('../app.js')

var request = request("http://localhost:3977")

describe('etapas', function() {
    describe('GET', function(){
        it('obtener varias etapas', function(done){
            request.get('/api/etapas/5ac555b99af98a1c307522e7').set('Authorization',token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    it('Should return json as data format when set Accept header to application/json', function(done){
        request.get('/api/etapas/5ac555b99af98a1c307522e7').set('Authorization',token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

});


