import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PouchDB from 'pouchdb';
import PouchDBfind from 'pouchdb-find';
import DBContext from './components/DBContext';
import { createIndexes } from './utils';
import AppRouter from './components/AppRouter';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import { EditInstructor } from './components/Settings/Instructors';
import useAuth from './components/Auth/useAuth';
PouchDB.plugin(PouchDBfind);

const DB = new PouchDB('stp', { auto_compaction: true });

if (process.env.REACT_APP_REMOTE_COUCHDB) {
  const AppDB = new PouchDB(`${process.env.REACT_APP_REMOTE_COUCHDB}/stp`, {
    auth: {
      username: process.env.REACT_APP_REMOTE_COUCHDB_USERNAME,
      password: process.env.REACT_APP_REMOTE_COUCHDB_PASSWORD
    }
  });
  DB.sync(AppDB, {
    live: true,
    retry: true
  })
    .on('change', info => console.info)
    .on('paused', err => console.error)
    .on('active', () => console.info('DB replication active.'))
    .on('denied', err => console.error)
    .on('complete', info => console.info)
    .on('error', err => console.error);
}

const App = () => {
  useEffect(() => {
    /*
    /* Before we render the rest of the app, check and see if there
    /* are DB indexes that need to be created, and create them.
    /* Indexes are defined in src/utils/createIndexes.ts for now.
     */
    (async () => {
      const createIndexesResults = await createIndexes(DB); // eslint-disable-line @typescript-eslint/no-unused-vars
    })();
  }, []);

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
    <DBContext.Provider value={DB}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              {isFirstRun ? <EditInstructor /> : <Login />}
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/">
              <AppRouter />
            </Route>
          </Switch>
        </Router>
      </div>
    </DBContext.Provider>
  );
};

export default App;
