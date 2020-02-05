import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import SettingsRouter from './Settings';
import StudentRouter from './Students';
import PrivateRoute from './PrivateRoute';
import styled from 'styled-components';

const Main = styled.div`
  margin: 2.5em 1em;
`;

const AppRouter = () => {
  return (
    <>
      <Header />
      <Main>
        <Switch>
          <Route exact path='/'>
            <StudentRouter />
          </Route>
          <PrivateRoute path='/settings'>
            <SettingsRouter />
          </PrivateRoute>
        </Switch>
      </Main>
    </>
  );
};

export default AppRouter;
