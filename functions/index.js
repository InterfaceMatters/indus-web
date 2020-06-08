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

/**
 * fetch dashboard chart data
 * @type {HttpsFunction & Runnable<any>}
 */
exports.fetchChartData = functions.https.onCall(async ({ orgId }, context) => {
  try {
    const today = new Date(Date.now() - 86400000);
    today.setHours(0, 0, 0, 0);
    // const lastWeek = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate() - 7
    // );

    const firestoreToday = admin.firestore.Timestamp.fromDate(today);
    // const firestorelastWeek = admin.firestore.Timestamp.fromDate(lastWeek);

    const staffAttendance = await admin
      .firestore()
      .collection('dailyLogs')
      .where('orgId', '==', orgId)
      .where('createdDate', '>', firestoreToday)
      .get();

    const healthMeter = await admin
      .firestore()
      .collection('users')
      .where('orgId', '==', orgId)
      .get();

    const healthy = healthMeter.docs
      .map(item => {
        return { ...item.data() };
      })
      .filter(item => item.healthStatus && item.healthStatus === 'Healthy');

    const grievanceCount = await admin
      .firestore()
      .collection('grievances')
      .where('orgId', '==', orgId)
      .where('noted', '==', false)
      .get();

    return {
      attendance: staffAttendance.size,
      healthyCount: healthy.length,
      totalStaff: healthMeter.size,
      grievanceCount: grievanceCount.size
    };
  } catch (error) {
    throw new functions.https.HttpsError(error.code, error.message);
  }
});
