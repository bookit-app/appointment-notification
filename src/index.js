'use strict';

exports.appointment= (data, appointment) => {
  const trigger = appointment.appointmentID;

  console.log(`Function triggered by change to: ${trigger}`);
  console.log(`Event type: ${appointment.appointmentID}`);

  if (data.oldValue && Object.keys(data.oldValue).time.date) {
    console.log(`\nOld value:`);
    console.log(JSON.stringify(data.oldValue, null, 2));

    module.exports.appointmentUpdate = async (data) => {
      const APP_NAME = 'Book It!';
    
      const mailOptions = {
        from: `${APP_NAME} <noreply@bookit.com>`,
        subject: 'Appointment Changed',
        text: `Hey ${data.firstName}! Your appointment at ${data.businessName} on ${data.oldValue.date} at ${data.oldValue.time} with ${data.staffMember} has been changed to
        ${data.date} at  ${data.date}`,
        to: data.email
      };
    
      await _getMailTransport().sendMail(mailOptions);
    
      console.info(`Book It appointment creation for ${data.email}`);
    };


  }

  if (data.value && Object.keys(data.appointmentID).data) {
    console.log(`\nNew value:`);
    console.log(JSON.stringify(data.value, null, 2));

    module.exports.appointmentCreate = async (data) => {
      const APP_NAME = 'Book It!';
    
      const mailOptions = {
        from: `${APP_NAME} <noreply@bookit.com>`,
        subject: 'Appointment Booked',
        text: `Hey ${data.firstName}! Your appointment at ${data.businessName} on ${data.date} at ${data.time} with ${data.staffMember} has been Booked!`,
        to: data.email
      };
    
      await _getMailTransport().sendMail(mailOptions);
    
      console.info(`Book It appointment creation for ${data.email}`);
    };


  }
};

const nodemailer = require('nodemailer');

let mailTransport;

module.exports.appointmentNotification = async (data) => {
  const APP_NAME = 'Book It!';

  const mailOptions = {
    from: `${APP_NAME} <noreply@bookit.com>`,
    subject: 'Appointment Booked',
    text: `Hey ${data.firstName}! Your appointment at ${data.businessName} on ${data.date} at ${data.time} with ${data.staffMember} has been Booked!`,
    to: data.email
  };

  await _getMailTransport().sendMail(mailOptions);

  console.info(`Book It appointment creation for ${data.email}`);
};

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
