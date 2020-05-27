import {
  createOrganization,
  fetchUserDataByAuthId,
  signOut,
  singIn
} from './index';

describe(`Firebase database queries test`, () => {

  describe('Onboarding actions', function() {
    it('should create a new organization', function() {
      const input = {
        name: 'ABC Inf'
      };

      const resolve = data => {
        expect(data.id).toBeDefined();
      };

      return createOrganization(input).then(data => resolve(data));
    });

    it('should fetch user data by auth id', function() {
      const resolve = data => {
        expect(data).toBeDefined();
      };

      return fetchUserDataByAuthId('TDvee50NU7M81Hx0E2aH6wS6DlD3').then(data => resolve(data));
    });

    it('should sign in the user', function() {
      const input = {
        email: 'pratik2@interfacem.com',
        password: 'secretPassword'
      };

      const resolve = data => {
        //TODO: Add credentials check.
      };

      return singIn(input).then(res => resolve(res));
    });

    it('should sign out the user', function() {
      const resolve = data => {
        expect(data).toBe(true);
      };
      return signOut().then(res => resolve(res));
    });
  });
});
