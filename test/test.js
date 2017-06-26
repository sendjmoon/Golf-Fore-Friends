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
let testCourse = require('./testCourse.json');

describe('testing routes', () => {
  before((done) => {
    // mongoose.connect(process.env.DB_SERVER);
    server = app.listen(3000, () => {
      console.log('test server up on 3000');
      done();
    });
  });

  after((done) => {
    // mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    // });
  });

  it('should run a get request', (done) => {
    request(baseUrl)
    .get('/')
    .end((err, res) => {
      expect(err).to.have.status(404);
      expect(res.text).to.eql('Not Found');
      done();
    });
  })
});
