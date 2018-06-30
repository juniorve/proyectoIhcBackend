"use strict" 

const     token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c2VyIjoiNWFiMTE5YzA2YWNiZTcyNTY0ZmVlZThlIiwibmFtZSI6Ikp1YW4iLCJzdXJuYW1lIjoiRG9taW5ndWV6IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYWlzIjoiUGVyw7oiLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTUyMTgyMzk0OH0.LQdWfuXlEV3xZz5qxT1nDl-pR7x2YJjHw2rJMF7TdHo';


let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url= 'http://localhost:3977';
var Evento = require('../models/evento');

let idEvento;

describe('Insert a evento: ',()=>{

	it('should insert a evento', (done) => {
		chai.request(url)
			.post('/api/evento').set('Authorization',token)
            .send({nom_evento:"Automatizacion Tecnologica", tipo_evento: "maraton", 
            fech_hora_ini: "", fech_hora_fin: "", max_asistentes:10,descripcion:"automatizar",foto_evento:"",
            estado:"",user:"59f1189fad05dd1a0037a68a"})
		    .end( function(err,res){
                console.log(res.body)
                idEvento= res.body.evento._id;
                expect(res).to.have.status(201);
                expect(res.body.evento).to.have.property('_id').to.be.equal(idEvento);
                expect(res.body.evento).to.be.not.undefined;
				done();
			});
    });
});
    
    
    /*---------------- describe('get the evento with id is 5ab11ad06acbe72564feee8f: ',()=>{

        it('should get the country with id 5ab11ad06acbe72564feee8f', (done) => {
            chai.request(url)
                .get('/api/evento/5ab11ad06acbe72564feee8f').set('Authorization',token)
                .end( function(err,res){
                    console.log(res.body)
                    expect(res.body).to.have.property('_id').to.be.equal('5ab11ad06acbe72564feee8f');
                    expect(res).to.have.status(200);
                    done();
                });
        });  
    });

    ------------------*/

    describe('recuperar evento y mostrar un valor en especifico ',()=>{
        it('recuperar y comparar un atributo de un evento', (done) => {
          chai.request(url)
          request.get('/api/evento/'+idEvento).set('Authorization',token)
          .end( function(err,res){
              console.log(res.body)
              expect(res.body.evento).to.have.property('nom_evento').to.be.equal('Automatizacion Tecnologica');
               expect(res).to.have.status(200);
              done();
            });
        });
      });
           
    describe('Error en insercion de un evento: ',()=>{

	it('should receive an error', (done) => {
		chai.request(url)
			.post('/api/evento').set('Authorization',token)
			.send({nom_evento:"Automatizacion Tecnologicas", tipo_evento: "maraton", 
            fech_hora_ini: "", fech_hora_fin: "", max_asistentes:"",descripcion:"",foto_evento:"",estado:"",user:""})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(404);
				done();
			});
	    });
    });

/* describe('/PUT/api/evento/:id evento', () => {
    it('editar un evento enviando el id como parametro', (done) => {
             chai.request(url)
              .put('/api/evento/5acfb6ca143f234798ae0162').set('Authorization',token)
              .send({nom_evento:"Automatizacion Tecnologica", tipo_evento: "maraton", 
              fech_hora_ini: "", fech_hora_fin: "", max_asistentes:10,descripcion:"se automatiza",
              foto_evento:"", estado:"activo",user:"59f1189fad05dd1a0037a68a"})
              .end((err, res) => {
              expect(res).to.have.status(200);
              console.log(res.body);
              expect(res.body.evento).to.have.property('descripcion').to.be.equal('se automatiza');
              done();
              });
    });
});
 */
/* 
describe('/PUT/api/evento/:id evento', () => {
    it('it should UPDATE a book given the id', (done) => {
             chai.request(url)
              .put('/api/evento/5acfe0d23910f467b0cd0557').set('Authorization',token)
              .send({nom_evento:"Automatizacion Tecnologica", tipo_evento: "maraton", 
              fech_hora_ini: "", fech_hora_fin: "", max_asistentes:10,descripcion:"se automatiza"})
              .end((err, res) => {
                  console.log(idEvento);
                  console.log(res.body);
              expect(res.body.evento).to.have.property('descripcion').to.be.equal('se automatiza');
              expect(res).to.have.status(200);
              done();
              });
    });
});
 */

describe('/PUT/api/evento/:id evento', () => {
    it('it should UPDATE a book given the id', (done) => {
             chai.request(url)
              .put('/api/evento/5aa1e2c07129f211d4777a79').set('Authorization',token)
              .send({nom_evento:"Automatizacion Tecnologica", tipo_evento: "maraton", 
              fech_hora_ini: "", fech_hora_fin: "", max_asistentes:10,descripcion:"se automatiza",foto_evento:"",
              estado:"",user:"59f1189fad05dd1a0037a68a"})
              .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.evento).to.have.property('descripcion').to.be.equal('se automatiza');
              done();
              });
    });
});


         /*    describe('/DELETE/:id evento', () => {
                it('recuperar evento y luego eliminar un evento mediante su id', (done) => {
                    chai.request(url)
                
                    .post('/api/evento').set('Authorization',token)
                    .send({nom_evento:"Automatizacion Tecnologica", tipo_evento: "maraton", 
                    fech_hora_ini: "", fech_hora_fin: "", max_asistentes:10,descripcion:"",foto_evento:"",
                    estado:"",user:"59f1189fad05dd1a0037a68a"})
                    .end( function(err,res){
                        console.log(res.body)
                        

                        chai.request(url)
                        .delete('/api/evento/'+res.body.evento._id).set('Authorization',token)
                          .end((err, res) => {
                            expect(res).to.have.status(200);
                            done();
                          });
                    }); 
    
                    });
            }); */
/* process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Evento = require('../models/evento');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Evento', () => {
    beforeEach((done) => {
        Book.remove({}, (err) => { 
           done();         
        });     
    });
    
  describe('/GET evento', () => {
      it('it should GET all the eventos', (done) => {
            chai.request(server)
            .get('/eventos')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST evento', () => {
      it('it should not POST a book without pages field', (done) => {
        let book = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            year: 1954
        }
            chai.request(server)
            .post('/book')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('pages');
                res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST a book ', (done) => {
        let book = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            year: 1954,
            pages: 1170
        }
            chai.request(server)
            .post('/book')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Book successfully added!');
                res.body.book.should.have.property('title');
                res.body.book.should.have.property('author');
                res.body.book.should.have.property('pages');
                res.body.book.should.have.property('year');
              done();
            });
      });
  });
  describe('/GET/:id book', () => {
      it('it should GET a book by the given id', (done) => {
        let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
        book.save((err, book) => {
            chai.request(server)
            .get('/book/' + book.id)
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('author');
                res.body.should.have.property('pages');
                res.body.should.have.property('year');
                res.body.should.have.property('_id').eql(book.id);
              done();
            });
        });

      });
  });
  describe('/PUT/:id book', () => {
      it('it should UPDATE a book given the id', (done) => {
        let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
        book.save((err, book) => {
                chai.request(server)
                .put('/book/' + book.id)
                .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book updated!');
                    res.body.book.should.have.property('year').eql(1950);
                  done();
                });
          });
      });
  });

  describe('/DELETE/:id book', () => {
      it('it should DELETE a book given the id', (done) => {
        let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
        book.save((err, book) => {
                chai.request(server)
                .delete('/book/' + book.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book successfully deleted!');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
                  done();
                });
          });
      });
  });*/
  
//------------------
var assert = require('assert');
var supertest = require('supertest')
var app = require('../app.js')
var request = supertest("http://localhost:3977")

//var request = supertest(app);

describe('GET /evento', function() {
    it('respond with json', function(done) {
    
      request.get('/api/evento/'+idEvento).set('Authorization',token)
      .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

describe('evento', function() {
    describe('GET', function(){
        it('recuperar un evento', function(done){
            request.get('/api/evento/'+idEvento).set('Authorization',token)
                .expect('Content-Type', /json/)
                .expect(200,done);
        });
    });

    it('Should return json as data format when set Accept header to application/json', function(done){
        request.get('/api/evento/'+idEvento).set('Authorization',token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    describe('GET', function(){
        it('Recuperar eventos creados por un usuario', function(done){
            request.get('/api/eventos/59f1189fad05dd1a0037a68a').set('Authorization',token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

});

describe('image', function() {
        it('recuperar imagen de evento', function(done){
            request.get('/api/get-img-evento/DnUlEFdetxWOYMv8t5orbNWy.jpg').set('Authorization',token)
                .expect('Content-Type', /image/)
                .expect(200, done);
        });
    });



/* 
describe('POST', function(){
    it('Should return 201 status code and location header', function(done){

        let evento = {user: "59f1189fad05dd1a0037a68a",
                       estado: "activo",
                       foto_evento: "",
                       descripcion: "Apple iPhone 6s 64 GB US Warranty Unlocked Cellphone - Retail Packaging (Rose Gold)",
                       max_asistentes:12,
                       fech_hora_fin:"",
                       fech_hora_ini:"",
                       tipo_evento:"",
                       nom_evento:""   
                    }

        request.post('/api/evento').set('Authorization',token)
            .send(evento)
            .expect(201)
            .expect('Location', '/api/evento',done);
    });
});
 */


describe('/DELETE/:id evento', () => {
    it('eliminar un evento mediante su id', (done) => {
        chai.request(url)
              .delete('/api/evento/'+idEvento).set('Authorization',token)
              .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.evento).to.have.property('_id').to.be.equal(idEvento);
                done();
              });
        });
}); 
