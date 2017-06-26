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

describe('testing routes', () => {
  before((done) => {
    server = app.listen(3000, () => {
      console.log('test server up');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('course: should respond with an error', (done) => {
    request(baseUrl)
    .post('/')
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
      expect(err).to.eql(null);
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
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
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
});
