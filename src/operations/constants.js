const ROLE_ID = {
  ADMIN: 10,
  EMPLOYEE: 20,
  SECURITY: 30
};

const orgId = localStorage.getItem('indusOrg');
const userId = localStorage.getItem('indusUser');


export { ROLE_ID, orgId, userId };
