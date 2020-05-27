import firebase from 'firebase/app';
import Message from '../components/Message';

export const currentServerTime = firebase.firestore.FieldValue.serverTimestamp();

export const timestampFromDate = inputDate =>
  firebase.firestore.Timestamp.fromDate(inputDate);


/*
  MESSAGES
 */

/**
 * Generic error - form validation
 */
export const GenericErrorForm = () =>
  Message.error('Fields marked as * are required.');

/**
 * Generic success - Update
 */
export const GenericSuccessUpdate = () =>
  Message.success('Data updated successfully.');

/**
 * Generic error - Update
 */
export const UnableToUpdate = () =>
  Message.error(
    'Unable to update data at this time. Please try again later.'
  );
/**
 * Generic error - Create
 */
export const UnableToCreate = () =>
  Message.error(
    'Unable to create data at this time. Please try again later.'
  );

/**
 * Generic create
 */
export const CreatedSuccessFully = () =>
  Message.success('Created successfully.');
