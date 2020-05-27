import { firestore, storage } from '../../firebase';
import {
  CreatedSuccessFully,
  currentServerTime as currentTime,
  GenericSuccessUpdate,
  UnableToCreate,
  UnableToUpdate
} from '../utils';
import { orgId, userId } from '../constants';
import firebase from 'firebase/app';

/**
 * Create a new protocol.
 * @param name: String
 * @param orgId: String
 * @param description: String
 * @param tags: Array
 * @returns {Promise<{id: *}|*>}
 */
const createNewProtocol = async ({ name, description, tags }) => {
  try {
    const res = await firestore.collection('protocols').add({
      name,
      orgId,
      description,
      tags: tags,
      createdDate: currentTime,
      updatedDate: currentTime,
      createdBy: userId,
      active: true
    });
    CreatedSuccessFully();
    return { id: res.id };
  } catch (e) {
    UnableToCreate();
  }
};

/**
 * Add new step to protocol
 * @param file: File
 * @param protocolId: String
 * @param description: String
 * @returns {Promise<{id: *}|*>}
 */
const addNewStep = async ({ file, protocolId, description }) => {
  try {
    let fileUrl = null;

    if (file) {
      const protocolRef = storage.ref().child('protocols');

      const fileRef = protocolRef.child(`/${file.name}`);

      const metadata = {
        contentType: file.type
      };

      const uploadRes = await fileRef.put(file, metadata);
      fileUrl = await uploadRes.ref.getDownloadURL();
    }

    const res = await firestore.collection('steps').add({
      ...(fileUrl
        ? { fileUrls: firebase.firestore.FieldValue.arrayUnion(fileUrl) }
        : null),
      protocolId,
      description,
      createdDate: currentTime,
      updatedDate: currentTime
    });
    CreatedSuccessFully();
    return { id: res.id };
  } catch (e) {
    UnableToCreate();
  }
};

/**
 * Fetch all active protocols
 * @returns {Promise<{id: *}[]|*>}
 */
const fetchAllProtocols = async () => {
  try {
    const orgId = localStorage.getItem('indusOrg');
    const res = await firestore
      .collection('protocols')
      .where('orgId', '==', orgId)
      .orderBy('updatedDate', 'desc')
      .get();

    return res.docs.map(item => {
      return { ...item.data(), id: item.id };
    });
  } catch (e) {
    UnableToUpdate();
  }
};

/**
 * Fetch Protocol steps
 * @param protocolId
 * @returns {Promise<{id: *}[]|*>}
 */
const fetchProtocolDetails = async protocolId => {
  try {
    const protocolRes = await firestore
      .collection('protocols')
      .doc(protocolId)
      .get();

    const stepRes = await firestore
      .collection('steps')
      .where('protocolId', '==', protocolId)
      .get();

    const stepArr = stepRes.docs.map(item => {
      return { ...item.data(), id: item.id };
    });

    return {
      ...protocolRes.data(),
      id: protocolRes.id,
      additionalInfo: stepArr
    };
  } catch (e) {
    UnableToUpdate();
  }
};

/**
 * Update protocol
 * @param protocolId: String
 * @param data: Object
 * @returns {Promise<{id: *}|*>}
 */

const updateProtocol = async ({ protocolId, data }) => {
  try {
    await firestore
      .collection('protocols')
      .doc(protocolId)
      .update({ ...data, updatedDate: currentTime });

    GenericSuccessUpdate();
    return true;
  } catch (e) {
    UnableToUpdate();
  }
};

/**
 * Update step.
 * @param stepId
 * @param data
 * @returns {Promise<{id: *}|*>}
 */

const updateStep = async (stepId, data) => {
  try {
    let fileUrl = null;

    const { file, description, protocolId } = data;

    if (file) {
      const protocolRef = storage.ref().child('protocols');

      const fileRef = protocolRef.child(`/${file.name}`);

      const metadata = {
        contentType: file.type
      };

      const uploadRes = await fileRef.put(file, metadata);
      fileUrl = await uploadRes.ref.getDownloadURL();
    }

    await firestore
      .collection('steps')
      .doc(stepId)
      .update({
        ...(fileUrl
          ? { fileUrls: firebase.firestore.FieldValue.arrayUnion(fileUrl) }
          : null),
        protocolId,
        description,
        createdDate: currentTime,
        updatedDate: currentTime
      });
    GenericSuccessUpdate();
    return true;
  } catch (e) {
    UnableToUpdate();
  }
};

export {
  createNewProtocol,
  addNewStep,
  fetchAllProtocols,
  fetchProtocolDetails,
  updateProtocol,
  updateStep
};
