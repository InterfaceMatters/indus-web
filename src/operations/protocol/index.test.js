import {
  createNewProtocol,
  fetchAllProtocols,
  fetchProtocolDetails,
  updateProtocol
} from './index';

describe(`Protocol operations`, () => {
  it('should create new protocol', function() {
    const resolve = data => {
      expect(data.id).toBeDefined();
    };

    const data = {
      name: 'Test Protocol 2',
      tags: ['test', 'lorel', 'ipsum'],
      orgId: '1Qn16z7kFWqkcJBLFVTn',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    };

    return createNewProtocol(data).then(data => resolve(data));
  });

  it('should fetch all protocols', function() {
    const resolve = data => {
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(1);
    };

    const orgId = '1Qn16z7kFWqkcJBLFVTn';

    return fetchAllProtocols(orgId).then(data => resolve(data));
  });

  it('should fetch all protocol steps', function() {
    const resolve = data => {
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(1);
    };

    const protocolId = 'Y2dEmwo81pEzhcHY6SqR';

    return fetchProtocolDetails(protocolId).then(data => resolve(data));
  });

  it('should update protocol details', function() {
    const resolve = data => {
      expect(data).toBe(true);
    };

    const protocolId = 'Y2dEmwo81pEzhcHY6SqR';
    const data = {
      active: true
    };

    return updateProtocol({ protocolId, data }).then(data => resolve(data));
  });
});
