'use strict';

exports.updateAppointment = functions.firestore
    .document('appointments/{appointmentId}/time')('appointments/{appointmentId}/date')
    .onUpdate((change, context) => {
      // Get an object representing the document
     
      const newValue = change.after.data();

      // ...or the previous value before this update
      const previousValue = change.before.data();

      // access a particular field as you would any JS property
      const name = newValue.appointment;

      // perform desired operations ...

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
    
    });

exports.createAppointment = functions.firestore
    .document('appointments/{appointmentId}')
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      // access a particular field as you would any JS property
      const data = newValue.appointment;

      // perform desired operations ...

         
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
    
    });

exports.appointment= (data, appointment) => {
  const trigger = appointment.appointmentID;

  console.log(`Function triggered by change to: ${trigger}`);
  console.log(`Event type: ${appointment.appointmentID}`);
  
  
  const usersRef = db.collection('appointments').doc('aid')

usersRef.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      usersRef.onSnapshot((doc) => {
        
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
        

      });
    } 
});


exports.sendEmail = functions.firestore.document('appointments/{appointmentId}')
  .onUpdate((change, context) => {  
   const after = change.after.data();

    if(after.status === 'VERIFIED'){
      console.log('profile verified')
      const db = admin.firestore();


      return db.collection('users').doc(userId)  // get userId
      .get()
      .then(doc => {
         const user = doc.data();
         const msg = {
           to: 'email',
           from: 'email',
           templateId: 'template id',
           dynamic_template_data: {
            subject: 'Profile verified',
            name: 'name',
        },
       };
       return sgMail.send(msg)
   })
   .then(() => console.log('email sent!') )
   .catch(err => console.log(err) )
    } 
  });

  if (data.oldValue && Object.keys(data.appointment).time.stringify != (data.appointment.value).time.stringify) {
    console.log(`\nOld value:`);
    console.log(JSON.stringify(data.oldValue, null, 2));

    module.exports.appointmentUpdate = async (data) => {
      const APP_NAME = 'Book It!';
    
      const mailOptions = {
        from: `${APP_NAME} <noreply@bookit.com>`,
        subject: 'Appointment Changed',
        text: `Hey ${data.firstName}! Your appointment at ${data.businessName} on ${data.oldValue.date} at ${data.oldValue.time} with ${data.staffMember} has been changed to
        ${data.appointment.date} at ${data.appointment.time}`,
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
