import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import SettingsRouter from './Settings';
import DBContext from './DBContext';
import PouchDB from 'pouchdb';
import PouchDBfind from 'pouchdb-find';
import StudentRouter from './Students';
import { createIndexes } from '../utils';
PouchDB.plugin(PouchDBfind);

const DB = new PouchDB('stp', { auto_compaction: true });
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

const AppRouter = () => {
  useEffect(() => {
    /* Before we render the rest of the app, check and see if there
     * are DB indexes that need to be created, and create them.
     * Indexes are defined in src/utils/createIndexes.ts for now.
     */
    (async () => {
      const createIndexesResults = await createIndexes(DB); // eslint-disable-line @typescript-eslint/no-unused-vars
    })();
  }, []);

  return (
    <DBContext.Provider value={DB}>
      <Header />
      <div className="Main">
        <Switch>
          <Route exact path="/">
            <StudentRouter />
          </Route>
          <Route path="/settings">
            <SettingsRouter />
          </Route>
        </Switch>
      </div>
    </DBContext.Provider>
  );
};

export default AppRouter;
