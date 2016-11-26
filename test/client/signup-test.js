const mongoose = require('mongoose');
const chai = require('chai');
const User = require('./../../app/models/user');
const chaiHttp = require('chai-http');
const server = require('./../../server');
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const url = '/api/auth/signup';

describe('Signup', () => {
  it('verifies that signup fails for incomplete details', (done) => {
    let user = {
      name: 'testUser1',
      email: '',
      password: '',
      avatar: 'avatar011'
    };

    chai.request(server)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.body.should.have.property('message').eql('Incomplete SignUp Details Provided.')
        done();
      });
  });


  it('verifies that signup is sucessful', (done) => {
    let user = {
      name: 'Andela',
      email: 'andela@yahoo.com',
      password: '12345',
      avatar: 'andela1'
    };

    chai.request(server)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('Thank you for signing up!');
        expect(typeof res.body.token).to.equal('string');
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        expect(res).to.have.status(200);
        done();
      });
  });


  it('verifies that a user can not register more than sucessful', (done) => {
    let user = {
      name: 'Andela',
      email: 'andela@yahoo.com',
      password: '12345',
      avatar: 'andela1'
    };

    chai.request(server)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('User already exists!');
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        expect(res).to.have.status(200);
        done();
      });
  });

});