import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createIndexes } from './utils';
import AppRouter from './components/AppRouter';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import { EditInstructor } from './components/Settings/Instructors';
import PrivateRoute from './components/PrivateRoute';
import useDB from './useDB';
import styled from 'styled-components';

const AppContainer = styled.div`
  color: var(--body-text-color);
  background-color: var(--body-background-color);
`;

const App = () => {
  const { DB } = useDB();
  useEffect(() => {
    /*
    /* Before we render the rest of the app, check and see if there
    /* are DB indexes that need to be created, and create them.
    /* Indexes are defined in src/utils/createIndexes.ts for now.
     */
    (async () => {
      const createIndexesResults = await createIndexes(DB); // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars
    })();
  }, [DB]);

  const isFirstRun = JSON.parse(
    window.localStorage.getItem('stp:isFirstRun') || 'true'
  );

  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route path='/login'>
            {isFirstRun ? <EditInstructor /> : <Login />}
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
          <PrivateRoute path='/'>
            <AppRouter />
          </PrivateRoute>
        </Switch>
      </Router>
    </AppContainer>
  );
};

export default App;
