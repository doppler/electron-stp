import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import useAuth from './Auth/useAuth';

interface PrivateRouteProps extends RouteProps {
  children?: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { children, ...rest } = props;
  const { isAdminUser } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        // user && user.roles.include('admin') ? (
        isAdminUser() ? (
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
