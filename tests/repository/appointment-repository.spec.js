'use strict';

const { expect } = require('chai');
const { createStubInstance } = require('sinon');
const AppointmentRepository = require('../../src/repository/appointment-repository');
const {
  CollectionReference,
  DocumentReference,
  Firestore
} = require('@google-cloud/firestore');

const appointment = {
  staffMemberId: 'TEST-STAFF-ID',
  providerId: 'TEST-PROVIDER-Id',
  clientId: 'TEST-CLIENT-ID',
  time: '12:30',
  date: '12-10-2019'
};

describe('appointment-repository: unit tests', () => {
  let repo, firestore;
  let collectionReference, documentReference;

  before(() => {
    firestore = createStubInstance(Firestore);
    collectionReference = createStubInstance(CollectionReference);
    documentReference = createStubInstance(DocumentReference);
    collectionReference.doc.returns(documentReference);
    firestore.collection.returns(collectionReference);

    repo = new AppointmentRepository(firestore);
  });

  afterEach(() => {
    documentReference.get.resetHistory();
    collectionReference.doc.resetHistory();
    collectionReference.get.resetHistory();
  });

  context('findByAppointmentId', () => {
    it('should return provider when found', () => {
      documentReference.get.resolves({
        id: 'TEST-ID',
        data: () => appointment,
        exists: true
      });

      expect(repo.findByAppointmentId('APPT-ID')).to.be.fulfilled.then(
        response => {
          expect(response).to.deep.equal(appointment);
        }
      );
    });

    it('should return empty object when nothing is found', () => {
      documentReference.get.resolves({
        exists: false
      });

      expect(repo.findByAppointmentId('APPT-ID')).to.be.fulfilled.then(
        response => {
          expect(response).to.deep.equal({});
        }
      );
    });

    it('should return empty object when doc reference is undefined', () => {
      documentReference.get.resolves(undefined);

      expect(repo.findByAppointmentId('APPT-ID')).to.be.fulfilled.then(
        response => {
          expect(response).to.deep.equal({});
        }
      );
    });
  });
});
