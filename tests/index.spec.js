 'use strict';

const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const nodemailer = require('nodemailer');
const { stub } = require('sinon');
const { appointmentNotification} = require('../src');

describe('appointment notification unit tests', () => {
  let createTransportStub;

  before(() => {
    createTransportStub = stub(nodemailer, 'createTransport');
    createTransportStub.returns({ sendMail: async () => console.log(true) });
  });

  it('should generate an email', done => {
    process.env['email-password'] = 'abc123';
    process.env['email-account'] = 'sample@sample.com';

    const data = {
      email: 'test@test.com'
    };
    const context = {};

    expect(appointmentNotification(data, context)).to.be.fulfilled.then(() => {
      expect(createTransportStub.called).to.be.true;

      // Send a second mail to ensure the global is re-used
      expect(appointmentNotification(data, context)).to.be.fulfilled.then(() => {
        expect(createTransportStub.callCount).to.equal(1);
        done();
      });
    });
  });
});
