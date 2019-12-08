'use strict';

const { isEmpty } = require('lodash');
const APPOINTMENT = 'appointments';

class AppointmentRepository {
  constructor(firestore) {
    this.firestore = firestore;
  }

  async findByAppointmentId(appointmentId) {
    const documentReference = await this.firestore
      .collection(APPOINTMENT)
      .doc(appointmentId)
      .get();

    if (isEmpty(documentReference) || !documentReference.exists) {
      return {};
    }

    const document = documentReference.data();
    document.appointmentId = documentReference.id;
    return document;
  }
}

module.exports = AppointmentRepository;
module.exports.appointmentRepositoryInstance = new AppointmentRepository(
  require('./firestore')
);
