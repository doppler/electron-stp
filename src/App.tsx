import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createIndexes } from './utils';
import AppRouter from './components/AppRouter';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import { EditInstructor } from './components/Settings/Instructors';
import useAuth from './components/Auth/useAuth';
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
      const createIndexesResults = await createIndexes(DB); // eslint-disable-line @typescript-eslint/no-unused-vars
    })();
  }, [DB]);

  /*
  /* FirstRun:
  /* If there are no _users docs besides the _design doc, we'll use the 
  /* EditInstructor interface to create a new Instructor and _user at
  /* the same time. Otherwise, we'll just use the Login screen.
   */
  const [didFetchUserDocCount, setFetchedUserDocCount] = useState(false);
  const [isFirstRun, setFirstRun] = useState(true);
  const { userDocCount } = useAuth();
  useEffect(() => {
    setFirstRun(userDocCount <= 0);
    setFetchedUserDocCount(userDocCount !== -999); // magic number
  }, [userDocCount]);
  if (!didFetchUserDocCount) return null;

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
