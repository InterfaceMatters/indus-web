import { firestore } from '../../firebase';
import {
  currentServerTime as currentTime,
  GenericSuccessUpdate,
  UnableToUpdate
} from '../utils';

/**
 * Fetch all grievances.
 * @returns {Promise<{id: *}[]|*>}
 */
const fetchAllGrievance = async () => {
  try {
    const orgId = localStorage.getItem('indusOrg');
    const response = await firestore
      .collection('grievances')
      .where('orgId', '==', orgId)
      .orderBy('createdDate', 'desc')
      .get();
    return response.docs.map(item => {
      return { ...item.data(), id: item.id };
    });
  } catch (e) {
    UnableToUpdate();
  }
};

/**
 * Update grievance - Mark as noted
 * @returns {Promise<{id: *}|*>}
 * @param grievanceId
 */

const updateGrievance = async grievanceId => {
  try {
    await firestore
      .collection('grievances')
      .doc(grievanceId)
      .update({ noted: true, updatedDate: currentTime });
    GenericSuccessUpdate();
    return true;
  } catch (e) {
    UnableToUpdate();
  }
};

/**
 * Fetch grievance details
 * @returns {Promise<{id: *}|*>}
 * @param grievanceId
 */

const fetchGrievanceDetails = async grievanceId => {
  try {
    const response = await firestore
      .collection('grievances')
      .doc(grievanceId)
      .get();

    return { ...response.data(), id: response.id };
  } catch (e) {
    UnableToUpdate();
  }
};

export { fetchAllGrievance, updateGrievance, fetchGrievanceDetails };
