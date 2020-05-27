import { firestore } from '../../firebase';
import firebase from 'firebase/app';
import { UnableToUpdate } from '../utils';

/**
 * Fetch tags
 * @param type one Of ['protocols', 'grievances', 'staff']
 * @returns {Promise<*|T>}
 */
const fetchTags = async type => {
  try {
    const response = await firestore
      .collection('tags')
      .doc(type)
      .get();
    return response.data();
  } catch (e) {
    UnableToUpdate();
  }
};

/**
 * Add tag
 * @param type one Of ['protocols', 'grievances', 'staff']
 * @param tag: String
 * @returns {Promise<boolean|*>}
 */
const addTag = async (type, tag) => {
  try {
    await firestore
      .collection('tags')
      .doc(type)
      .update({
        list: firebase.firestore.FieldValue.arrayUnion(tag)
      });
    return true;
  } catch (e) {
    UnableToUpdate();
  }
};

export { fetchTags, addTag };
