import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = props => {
  const { component: Component, user, ...rest } = props;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user !== null ? (
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
