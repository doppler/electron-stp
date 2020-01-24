import { useContext, useCallback } from 'react';
import DBContext from './components/DBContext';
import useAuth from './components/Auth/useAuth';

const useDB = () => {
  const DB = useContext(DBContext);
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
    [DB, usersDB]
  );

  const get = useCallback(
    async _id => {
      let result;
      try {
        // @ts-ignore
        result = await DB.get(_id);
      } catch (error) {
        console.log(error);
      }
      return result;
    },
    [DB]
  );

  const find = useCallback(
    async query => {
      let result;
      try {
        // @ts-ignore
        result = await DB.find(query);
      } catch (error) {
        console.error(error);
      }
      return result.docs;
    },
    [DB]
  );

  return { put, get, find };
};

export default useDB;
