'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let mongoose = require('mongoose');

const request = chai.request;
const expect = chai.expect;

process.env.NODE_ENV = 'test';

const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

let app = require('../api/app');
let server;

let baseUrl = 'localhost:3000'
let testCourse = require('./testCourse');
let testUser = require('./testUser');

describe('testing routes', () => {
  before((done) => {
    server = app.listen(3000, () => {
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

  it('course: GET should respond with a 404 error when request sent for an unknown route', (done) => {
    request(baseUrl)
      .get('/')
      .end((err, res) => {
        expect(err).to.have.status(404);
        expect(res.text).to.include('Not Found');
        done();
      });
  });

  it('course: GET should respond with 200', (done) => {
    request(baseUrl)
      .get('/course')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('success');
        done();
      });
  });

  it('course: POST should respond with new course', (done) => {
    request(baseUrl)
      .post('/course/create')
      .send(testCourse)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.deep.property('name', 'Redmond Ridge');
        done();
      });
  });

  it('course: POST should respond with an error when required data is missing', (done) => {
    request(baseUrl)
      .post('/course/create')
      .send({ name: 'newcastle' })
      .end((err, res) => {
        expect(err).to.have.status(500);
        expect(res.text).to.include('Error creating course');
        done();
      });
  });

  it('user: POST to register a new user should respond with the user object', (done) => {
    request(baseUrl)
      .post('/user/register')
      .send(testUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.deep.property('username', 'testUser');
        done();
      });
  });

  it('user: POST to register an existing user should respond with an error', (done) => {
    request(baseUrl)
      .post('/user/register')
      .send(testUser)
      .end((err, res) => {
        expect(err).to.have.status(500);
        expect(res.text).to.include('Error creating user');
        done();
      });
  });

  it('user: POST to login should respond with the user\'s name', (done) => {
    request(baseUrl)
      .post('/user/login')
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

  it('user: POST to login should fail and respond with an error', (done) => {
    request(baseUrl)
      .post('/user/login')
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
