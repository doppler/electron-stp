import jwt from 'jsonwebtoken';
import PouchDB from 'pouchdb';
import PouchDBfind from 'pouchdb-find';
import { useCallback } from 'react';
import useAuth from './components/Auth/useAuth';
PouchDB.plugin(PouchDBfind);

const DB = new PouchDB('stp', { auto_compaction: true });

const token = localStorage.getItem('stp:dbSyncSettings');

let dbSyncSettings: any = {};
if (token) dbSyncSettings = jwt.verify(token, process.env.NODE_ENV);

if (dbSyncSettings.doSync) {
  const AppDB = new PouchDB(dbSyncSettings.url, {
    auth: {
      username: dbSyncSettings.username,
      password: dbSyncSettings.password
    }
  });
  DB.sync(AppDB, {
    live: true,
    retry: true
  })
    .on('change', info => console.info(info))
    .on('active', () => console.info('DB replication active.'))
    .on('complete', info => console.info(info))
    .on('error', error => console.error(error))
    .on('denied', error => console.error(error));
}

const useDB = () => {
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
        result = await DB.put(doc);
      } catch (error) {
        console.error(error);
      }
      return result;
    },
    [usersDB]
  );

  const get = useCallback(async _id => {
    let result;
    try {
      result = await DB.get(_id);
    } catch (error) {
      console.error(error);
    }
    return result;
  }, []);

  const find = useCallback(async query => {
    let result;
    try {
      result = await DB.find(query);
    } catch (error) {
      console.error(error);
    }
    if (result && result.docs) return result.docs;
    else return [];
  }, []);

  const allDocs = useCallback(async (opts: {}) => {
    let result;
    try {
      result = await DB.allDocs(opts);
    } catch (error) {
      console.error(error);
    }
    if (result && result.rows) return result.rows.map(row => row.doc) as any;
    else return [];
  }, []);

  return { DB, put, get, find, allDocs };
};

export default useDB;
