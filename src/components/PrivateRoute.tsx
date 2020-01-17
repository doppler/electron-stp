import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  children?: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { children, ...rest } = props;
  const user = JSON.parse(window.sessionStorage.getItem('stp:user') || 'null');
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
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
