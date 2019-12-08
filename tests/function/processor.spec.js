'use strict';

const { expect } = require('chai');
const { stub } = require('sinon');
const processor = require('../../src/processor.js');
const appointment = {
  clientId: 'TEST-CLIENT-ID',
  businessName: 'TEST-BUSINESS',
  date: '2019-12-01'
};
const profile = {
  email: 'test@test.com',
  firstName: 'TEST-CLIENT-NAME'
};

describe('appointment notification unit tests', () => {
  let repoStub, profileClientStub;

  before(() => {
    repoStub = {
      findByAppointmentId: stub().resolves(appointment)
    };
    profileClientStub = {
      queryProfile: stub().resolves(profile)
    };
  });

  it('should generate an email', () => {
    process.env['email-password'] = 'abc123';
    process.env['email-account'] = 'sample@sample.com';
    const data = {};
    const context = {
      params: {
        appointmentId: 'TEST-APPOINTMENT'
      }
    };

    const transport = { sendMail: stub().resolves() };
    expect(
      processor(data, context, repoStub, profileClientStub, transport)
    ).to.be.fulfilled.then(() => {
      expect(transport.sendMail.called).to.be.true;
    });
  });
});
