import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import useAuth from './Auth/useAuth';

interface PrivateRouteProps extends RouteProps {
  children?: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { children, ...rest } = props;
  const { isAdminUser, isInstructor } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAdminUser() || isInstructor() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
