import PouchDB from 'pouchdb';
import PouchDBfind from 'pouchdb-find';
import { useCallback } from 'react';
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

const useDB = () => {
  // const DB = useContext(DBContext);
  const { usersDB } = useAuth();

  const put = useCallback(
    async doc => {
      let result;
      try {
        if (doc._deleted && doc.type === 'instructor') {
          usersDB
            .get(`org.couchdb.user:${doc.email}`)
            .then(user => usersDB.remove(user));
        }
        // @ts-ignore
        result = await DB.put(doc);
      } catch (error) {
        console.log(error);
      }
      return result;
    },
    [usersDB]
  );

  const get = useCallback(async _id => {
    let result;
    try {
      // @ts-ignore
      result = await DB.get(_id);
    } catch (error) {
      console.log(error);
    }
    return result;
  }, []);

  const find = useCallback(async query => {
    let result;
    try {
      // @ts-ignore
      result = await DB.find(query);
    } catch (error) {
      console.error(error);
    }
    if (result && result.docs) return result.docs;
    else return [];
  }, []);

  return { DB, put, get, find };
};

export default useDB;
