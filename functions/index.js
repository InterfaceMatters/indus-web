const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();

/**
 * Register user to auth
 * @type {HttpsFunction & Runnable<any>}
 */
exports.registerUser = functions.https.onCall(
  async ({ phoneNumber }, context) => {
    try {
      return await admin.auth().createUser({
        phoneNumber,
        disabled: false
      });
    } catch (error) {
      throw new functions.https.HttpsError(error.code, error.message);
    }
  }
);

/**
 * Delete user from auth
 * @type {HttpsFunction & Runnable<any>}
 */
exports.deleteUser = functions.https.onCall(async ({ uid }, context) => {
  try {
    return await admin.auth().deleteUser(uid);
  } catch (error) {
    throw new functions.https.HttpsError(error.code, error.message);
  }
});

/**
 * Update user auth info
 * @type {HttpsFunction & Runnable<any>}
 */
exports.updateUser = functions.https.onCall(async ({ uid, data }, context) => {
  try {
    return await admin.auth().updateUser(uid, data);
  } catch (error) {
    throw new functions.https.HttpsError(error.code, error.message);
  }
});
