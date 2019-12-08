'use strict';

const nodemailer = require('nodemailer');
const processor = require('./processor');

module.exports.appointmentNotification = async (data, context) =>
  processor(
    data,
    context,
    require('./repository/appointment-repository')
      .appointmentRepositoryInstance,
    require('./client/profile-client').profileClientInstance,
    nodemailer.createTransport({
      auth: {
        pass: process.env['email-password'],
        user: process.env['email-account']
      },
      service: 'gmail'
    })
  );
