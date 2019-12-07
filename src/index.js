'use strict';

const appointmentRepository = require('./repository/appointment-repository').appointmentRepositoryInstance;
const profileClient = require('./client/profile-client').profileClientInstance;

  await _getMailTransport().sendMail(mailOptions);

  console.info(`Book It appointment creation for ${clientProfile.email}`);

 const appointmentUpdate = async (data) => {
  const APP_NAME = 'Book It!';

  const mailOptions = {
    from: `${APP_NAME} <noreply@bookit.com>`,
    subject: 'Appointment Changed',
    text: `Hey ${profileClient.firstName}! Your appointment has been updated to ${appointment.date} at ${appointment.time}!`,
    to: profileClient.email
  };

  await _getMailTransport().sendMail(mailOptions);
  console.info(`Book It appointment creation for ${profileClient.email}`);
 };

const nodemailer = require('nodemailer');

let mailTransport;

module.exports.appointmentNotification = async (data, context) => {

  const { params } = context;

  const APP_NAME = 'Book It!';

  const appointment = await appointmentRepository.findByAppointmentId(params.appointmentId)

  const clientProfile = await profileClient.queryProfile(appointment.clientId);

appointmentUpdate(appointment)

  }

function _getMailTransport() {
  if (!mailTransport) {
    mailTransport = nodemailer.createTransport({
      auth: {
        pass: process.env['email-password'],
        user: process.env['email-account']
      },
      service: 'gmail'
    });
  }

  return mailTransport;
}
   
