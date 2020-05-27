import { fetchAllGrievance } from './index';

describe(`Grievances operations`, () => {

  it('should fetch all grievances of an org', function() {
    const resolve = data => {
      console.log(data);
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(1);
    };

    const orgId = '1Qn16z7kFWqkcJBLFVTn';

    return fetchAllGrievance(orgId).then(data => resolve(data));
  });
});
