import { firebaseFunctions, firestore } from '../../firebase';
import {
  CreatedSuccessFully,
  currentServerTime as currentTime,
  GenericSuccessUpdate,
  timestampFromDate,
  UnableToCreate,
  UnableToUpdate
} from '../utils';
import { ROLE_ID } from '../constants';
import { getSecondsPassedSinceMidnight } from '../../utils';
import Message from '../../components/Message';

/**
 *
 * @param uid
 * @param data:Object //key value pair of fields to be updated can be one of
 * @returns {Promise<boolean|*>}
 */
const updateEmployeeData = async (
  uid,
  {
    phoneNumber,
    name,
    roleId,
    dob,
    hasAccess = true,
    entryTime: entry,
    exitTime: exit,
    department,
    memberType,
    healthStatus,
    gender
  }
) => {
  try {
    if (phoneNumber) {
      const updateUser = firebaseFunctions.httpsCallable('updateUser');
      await updateUser({ uid, data: { phoneNumber } });
    }

    const entryTime = entry ? getSecondsPassedSinceMidnight(entry) : null;
    const exitTime = exit ? getSecondsPassedSinceMidnight(exit) : null;

    const data = {
      ...(name ? { name } : null),
      ...(phoneNumber ? { phoneNumber } : null),
      ...(roleId ? { roleId } : null),
      ...(dob ? { dob: timestampFromDate(new Date(dob)) } : null),
      ...(roleId ? { roleId } : null),
      ...(hasAccess !== null ? { hasAccess } : null),
      ...(entryTime ? { entryTime } : null),
      ...(exitTime ? { entryTime } : null),
      ...(department ? { department } : null),
      ...(memberType ? { memberType } : null),
      ...(healthStatus ? { healthStatus } : null),
      ...(gender ? { gender } : null)
    };

    await firestore
      .collection('users')
      .doc(uid)
      .update({ ...data, updatedDate: currentTime });

    GenericSuccessUpdate();
    return true;
  } catch (e) {
    UnableToUpdate();
  }
};

/**
 * Fetch all employees of an organization
 * @returns {Promise<{id: *}[]|*>}
 */
const fetchAllEmployees = async () => {
  try {
    const orgId = localStorage.getItem('indusOrg');
    const response = await firestore
      .collection('users')
      .where('orgId', '==', orgId)
      .where('roleId', '==', ROLE_ID.EMPLOYEE)
      .where('active', '==', true)
      .get();
    return response.docs.map(item => {
      return { ...item.data(), id: item.id, recentViolations: 0 };
    });
  } catch (e) {
    UnableToUpdate();
  }
};

/**
 * Register new user.
 * @param email
 * @param phoneNumber
 * @param name
 * @param roleId
 * @param dob
 * @param hasAccess
 * @param entryTime
 * @param exitTime
 * @returns {Promise<{id: *}|*>}
 */
const addEmployee = async ({
  phoneNumber,
  name,
  roleId,
  dob,
  hasAccess = true,
  entryTime: entry,
  exitTime: exit,
  department,
  memberType,
  healthStatus,
  gender
}) => {
  try {
    const orgId = localStorage.getItem('indusOrg');

    const addUserToAuth = firebaseFunctions.httpsCallable('registerUser');

    const authRes = await addUserToAuth({ phoneNumber });

    const entryTime = getSecondsPassedSinceMidnight(entry);
    const exitTime = getSecondsPassedSinceMidnight(exit);

    await firestore
      .collection('users')
      .doc(authRes.data.uid)
      .set({
        authId: authRes.data.uid,
        roleId,
        orgId,
        name,
        phoneNumber,
        createdDate: currentTime,
        updatedDate: currentTime,
        dob: timestampFromDate(new Date(dob)),
        dailyLogs: {},
        hasAccess,
        entryTime,
        exitTime,
        ...(department ? { department } : null),
        memberType,
        healthStatus,
        gender,
        active: true
      });
    CreatedSuccessFully();
    return true;
  } catch (e) {
    UnableToCreate();
  }
};

/**
 *
 * @param uid
 */

const removeEmployee = async uid => {
  try {
    const deleteUser = firebaseFunctions.httpsCallable('deleteUser');

    await deleteUser({ uid });

    await updateEmployeeData(uid, { active: false });
    Message.success('Removed successfully.');
    return true;
  } catch (e) {
    UnableToUpdate();
  }
};

export { updateEmployeeData, fetchAllEmployees, addEmployee, removeEmployee };
