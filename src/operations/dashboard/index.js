import { firestore } from '../../firebase';
import { UnableToUpdate } from '../utils';

/**
 * Fetch Recent grievances.
 * @returns {Promise<{id: *}[]|*>}
 */
const fetchRecentGrievances = async () => {
  try {
    const orgId = localStorage.getItem('indusOrg');
    const response = await firestore
      .collection('grievances')
      .where('orgId', '==', orgId)
      .orderBy('createdDate', 'desc')
      .limit(5)
      .get();
    return response.docs.map(item => {
      return { ...item.data(), id: item.id };
    });
  } catch (e) {
    UnableToUpdate();
  }
};

/**
 * Fetch Recent protocols.
 * @returns {Promise<{id: *}[]|*>}
 */
const fetchRecentProtocols = async () => {
  try {
    const orgId = localStorage.getItem('indusOrg');
    const response = await firestore
      .collection('protocols')
      .where('orgId', '==', orgId)
      .where('active', '==', true)
      .orderBy('updatedDate', 'desc')
      .limit(5)
      .get();
    return response.docs.map(item => {
      return { ...item.data(), id: item.id };
    });
  } catch (e) {
    UnableToUpdate();
  }
};

export { fetchRecentGrievances, fetchRecentProtocols };
