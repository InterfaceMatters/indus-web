import { addEmployee, fetchAllEmployees, updateEmployeeData } from './index';
import { ROLE_ID } from '../constants';

describe(`Employee operations`, () => {
  it('should update user data', function() {
    const resolve = data => {
      expect(data).toBe(true);
    };

    const data = {
      name: 'Pratik Singh'
    };

    return updateEmployeeData('bIAj1sSSrI2pTuus4Ztu', data).then(data =>
      resolve(data)
    );
  });

  it('should fetch all employees of an org', function() {
    const resolve = data => {
      console.log(data);
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(1);
    };

    const orgIDd = '1Qn16z7kFWqkcJBLFVTn';

    return fetchAllEmployees(orgIDd).then(data => resolve(data));
  });

  it('should create new user in firebase auth and fireStore', function() {
    const input = {
      phoneNumber: '+917973245190',
      displayName: 'Pratik',
      roleId: ROLE_ID.EMPLOYEE,
      orgId: 'VXNGVtxRJv5TzgX0WMmn',
      dob: '17/03/1995',
      hasAccess: true,
      entryTime: 549991,
      exitTime: 983331
    };

    const resolve = data => {
      expect(data).toBe(true);
    };

    return addEmployee(input).then(data => resolve(data));
  });
});
