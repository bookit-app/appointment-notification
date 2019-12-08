'use strict';

module.exports = async (
  data,
  context,
  appointmentRepository,
  profileClient,
  mailTransport
) => {
  const APP_NAME = 'Book It!';

  const appointment = await appointmentRepository.findByAppointmentId(
    context.params.appointmentId
  );

  const clientProfile = await profileClient.queryProfile(appointment.clientId);

  const mailOptions = {
    from: `${APP_NAME} <noreply@bookit.com>`,
    subject: 'Appointment Changed',
    text: `Hey ${clientProfile.firstName}! There have been changes made to your appointment with ${appointment.businessName} on ${appointment.date}. Please log into the app and check.`,
    to: clientProfile.email
  };

  await mailTransport.sendMail(mailOptions);
};
