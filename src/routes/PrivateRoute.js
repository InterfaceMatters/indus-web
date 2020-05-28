import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = props => {
  const { component: Component, user, ...rest } = props;

  const userId = localStorage.getItem('indusUser');
  const orgId = localStorage.getItem('indusOrg');

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user !== null && userId && orgId ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
