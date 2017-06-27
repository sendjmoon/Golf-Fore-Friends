'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let mongoose = require('mongoose');

const request = chai.request;
const expect = chai.expect;

process.env.NODE_ENV = 'test';

const TEST_PORT = 8000;
const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

let app = require('../api/app');
let server;

let baseUrl = 'localhost:' + TEST_PORT;
let testCourse = require('./testCourse');
let testUser = require('./testUser');

describe('testing routes', () => {
  before((done) => {
    server = app.listen(TEST_PORT, () => {
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close(() => {
        mongoose.connection.close(() => {
          done();
        });
      });
    });
  });

  it('should receive a 404 error for route that does not exist', (done) => {
    request(baseUrl)
      .get('/')
      .end((err, res) => {
        expect(err).to.have.status(404);
        expect(res.text).to.include('Not Found');
        done();
      });
  });

  it('should create a new course, respond with the course object', (done) => {
    request(baseUrl)
      .post('/courses/create')
      .send(testCourse)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.deep.property('name', 'Redmond Ridge');
        done();
      });
  });

  it('should respond with an error when required data is missing', (done) => {
    request(baseUrl)
      .post('/courses/create')
      .send({ name: 'newcastle' })
      .end((err, res) => {
        expect(err).to.have.status(500);
        expect(res.text).to.include('Error creating course');
        done();
      });
  });

  it('should register a new user and respond with the user object', (done) => {
    request(baseUrl)
      .post('/users/register')
      .send(testUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.deep.property('username', 'testUser');
        done();
      });
  });

  it('should respond with an error when trying to register a duplicate user', (done) => {
    request(baseUrl)
      .post('/users/register')
      .send(testUser)
      .end((err, res) => {
        expect(err).to.have.status(500);
        expect(res.text).to.include('Error creating user');
        done();
      });
  });

  it('successful login should respond with the user\'s name', (done) => {
    request(baseUrl)
      .post('/users/login')
      .send({
        emailOrUsername: testUser.username,
        password: testUser.password ,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.deep.property('firstName', testUser.firstName);
        done();
      });
  });

  it('invalid login should fail and respond with an error', (done) => {
    request(baseUrl)
      .post('/users/login')
      .send({
        emailOrUsername: testUser.username,
        password: 'wrongPassword'
      })
      .end((err, res) => {
        expect(err).to.have.status(400);
        expect(res.text).to.include('Incorrect username or password');
        done();
      });
  });
});
