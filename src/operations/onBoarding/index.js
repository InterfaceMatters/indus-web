import { firestore, auth } from '../../firebase';
import { CreatedSuccessFully, currentServerTime as currentTime, UnableToCreate } from '../utils';
import { ROLE_ID } from '../constants';
import Message from '../../components/Message';

/**
 * Register organization
 * @param name
 * @returns {Promise<{id: *}|*>}
 */
const createOrganization = async ({ name }) => {
  try {
    const createdOrg = await firestore.collection('organizations').add({
      name,
      createdDate: currentTime,
      updatedDate: currentTime,
      paymentStatus: false
    });
    CreatedSuccessFully();
    return { id: createdOrg.id };
  } catch (e) {
    UnableToCreate();
  }
};

/**
 * Register new admin.
 * @param email
 * @param orgId
 * @param password
 * @returns {Promise<{id: *}|*>}
 */
const registerOrgAdmin = async ({ email, orgId, password }) => {
  try {
    const createUser = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await firestore
      .collection('users')
      .doc(createUser.user.uid)
      .set({
        authId: createUser.user.uid,
        roleId: ROLE_ID.ADMIN,
        orgId,
        email,
        createdDate: currentTime,
        updatedDate: currentTime
      });

    const currentUser = createUser.user;

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    await currentUser.sendEmailVerification();
    return { link: true };
  } catch (e) {
    UnableToCreate();
  }
};

const fetchUserDataByAuthId = async uid => {
  try {
    const userData = await firestore
      .collection('users')
      .where('authId', '==', uid)
      .get();
    if (!userData.empty) {
      return { ...userData.docs[0].data(), id: userData.docs[0].id };
    }
    throw Error('User not found.');
  } catch (e) {
    Message.error(e.message);
  }
};

/**
 * Admin log in.
 * @param email
 * @param password
 * @returns {Promise<{signInRes: *, orgId: *}|*>}
 */
const singIn = async ({ email, password }) => {
  try {
    const signInRes = await auth.signInWithEmailAndPassword(email, password);
    const { orgId, id } = await fetchUserDataByAuthId(signInRes.user.uid);
    localStorage.setItem('indusOrg', orgId);
    localStorage.setItem('indusUser', id);
    return true;
  } catch (e) {
    Message.error('Please check your credentials.')
  }
};

/**
 * Log out.
 * @returns {Promise<boolean|*>}
 */
const signOut = async () => {
  try {
    await auth.signOut();
    localStorage.removeItem('indusOrg');
    localStorage.removeItem('indusUser');
    return true;
  } catch (e) {
    console.log(e);
  }
};

export {
  registerOrgAdmin,
  createOrganization,
  fetchUserDataByAuthId,
  singIn,
  signOut
};
