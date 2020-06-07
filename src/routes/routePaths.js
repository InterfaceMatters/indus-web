/**
 * All route paths in this file
 */

const Paths = {
  Login: '/',
  CreateAccount: '/createAccount',
  EmailSent: '/emailSent',
  Staff: '/staff',
  Logs: '/logs/:id',
  Dashboard: '/dashboard',
  Protocols: '/protocols',
  Grievance: '/grievance'
};

const GrievancePaths = {
  Details: `${Paths.Grievance}/details/:id`
};

const ProtocolPaths = {
  Details: `${Paths.Protocols}/details/:id`,
  DetailsEmpty: `${Paths.Protocols}/details/new`
};

export { Paths, GrievancePaths, ProtocolPaths };
