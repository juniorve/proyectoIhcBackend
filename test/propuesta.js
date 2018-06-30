const     token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c2VyIjoiNWFiMTE5YzA2YWNiZTcyNTY0ZmVlZThlIiwibmFtZSI6Ikp1YW4iLCJzdXJuYW1lIjoiRG9taW5ndWV6IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYWlzIjoiUGVyw7oiLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTUyMTgyMzk0OH0.LQdWfuXlEV3xZz5qxT1nDl-pR7x2YJjHw2rJMF7TdHo';
 let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url= 'http://localhost:3977';
let idPropuesta;
let propuesta = {nom_area:"innovación",
                titulo: "Una propuesta",
                descripcion: "es una propuesta",
                destinatario: "todos",
                imagen: "",
                video: "",
                archivo: "",
                desc_completa: "",
                experimento: "",
                aporte: "",
                tiempo: "",
                fuente_idea: "",
                exp_laboral: "",
                evento:"5aa1e2c07129f211d4777a79"};

describe('Insert Propuesta: ',()=>{

	it('Realizar el guardado de una propuesta', (done) => {
		chai.request(url)
			.post('/api/propuesta').set('Authorization',token)
            .send(propuesta)
			.end( function(err,res){
				console.log(res.body)
				idPropuesta=res.body.propuesta._id;
				expect(res).to.have.status(200);
                expect(res.body.propuesta).to.be.not.undefined;
                expect(res.body.propuesta).to.have.property('_id').to.be.equal(idPropuesta);
				done();
			});
    });

describe('Respuesta de error al insertar mal una propuesta',()=>{

	it('se recibe un error', (done) => {
		chai.request(url)
			.post('/api/propuesta')
			.send({nom_area:"innovación",
            titulo: "Una propuesta",
            descripcion: "es una propuesta"})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(403);
				done();
			});
	});
});


describe('/PUT/api/propuesta/:id evento', () => {
    it('editar una propuesta', (done) => {
             chai.request(url)
              .put('/api/propuesta/5ac5594b9af98a1c307522eb').set('Authorization',token)
              .send({nom_area:"innovación",
              titulo: "Una propuesta",
              descripcion: "se motivara creatividad",
              destinatario: "todos",
              imagen: "",
              video: "",
              archivo: "",
              desc_completa: "",
              experimento: "",
              aporte: "",
              tiempo: "",
              fuente_idea: "",
              exp_laboral: "",
              evento:"5aa1e2c07129f211d4777a79"})
              .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.propuesta).to.have.property('descripcion').to.be.equal('se motivara creatividad');
              done();
              });
    });
});

var assert = require('assert');
var request = require('supertest')
var app = require('../app.js')

var request = request("http://localhost:3977")

describe('products', function() {
    describe('GET', function(){
        it('recuperar una propuesta', function(done){
            request.get('/api/propuesta/'+idPropuesta).set('Authorization',token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    it('Should return json as data format when set Accept header to application/json', function(done){
        request.get('/api/propuesta/'+idPropuesta).set('Authorization',token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


    describe('image', function(){
        it('recuperar imagen de propuesta', function(done){
            request.get('/api/get-img-propuesta/TGjMrgxfiyPVapq8zk79T7il.jpg').set('Authorization',token)
                .expect('Content-Type', /image/)
                .expect(200, done);
        });
    });});

