import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GrievancePaths, Paths, ProtocolPaths } from './routePaths';

/**
 * Import Containers here
 */

import Staff from '../containers/Staff';
import Protocols from '../containers/Protocols';
import Grievance from '../containers/Grievance';
import GrievanceDetails from '../containers/Grievance/components/GrievanceDetails';
import Dashboard from '../containers/Dashboard';
import ProtocolDetails from '../containers/Protocols/components/ProtocolDetails';
import PrivateRoute from './PrivateRoute';
import OrganisationForm from '../containers/Onboarding/components/OrganisationForm';
import Login from '../containers/Onboarding';
import EmailSent from '../containers/Onboarding/components/EmailSent';
import Logs from '../containers/Staff/Logs';

const Routes = ({ user }) => (
  <Switch>
    <Route exact={true} path={Paths.Login} component={Login} />
    <Route
      exact={true}
      path={Paths.CreateAccount}
      component={OrganisationForm}
    />

    <Route exact={true} path={'/emailSent'} component={EmailSent} />
    <PrivateRoute
      exact={true}
      path={Paths.Staff}
      component={Staff}
      user={user}
    />
    <PrivateRoute
      exact={true}
      path={Paths.Logs}
      component={Logs}
      user={user}
    />
    <PrivateRoute
      exact={true}
      path={Paths.Protocols}
      component={Protocols}
      user={user}
    />
    <PrivateRoute
      exact={true}
      path={Paths.Grievance}
      component={Grievance}
      user={user}
    />
    <PrivateRoute
      exact={true}
      path={Paths.Dashboard}
      component={Dashboard}
      user={user}
    />
    <PrivateRoute
      user={user}
      exact={true}
      path={GrievancePaths.Details}
      component={GrievanceDetails}
    />
    <PrivateRoute
      user={user}
      exact={true}
      path={ProtocolPaths.Details}
      component={ProtocolDetails}
    />
  </Switch>
);

export default Routes;
