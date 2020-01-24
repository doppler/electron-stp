import PouchDB from 'pouchdb';
import { useState, useEffect } from 'react';
PouchDB.plugin(require('pouchdb-auth'));

const usersDB = new PouchDB('_users', { auto_compaction: true });

if (process.env.REACT_APP_REMOTE_COUCHDB) {
  const remoteUsersDB = new PouchDB(
    `${process.env.REACT_APP_REMOTE_COUCHDB}/_users`,
    {
      auth: {
        username: process.env.REACT_APP_REMOTE_COUCHDB_USERNAME,
        password: process.env.REACT_APP_REMOTE_COUCHDB_PASSWORD
      }
    }
  );
  usersDB
    .sync(remoteUsersDB, {
      live: true,
      retry: true,
      filter: function(doc) {
        return !doc._id.match(/^_design\/_auth/);
      }
    })
    .on('change', info => console.info)
    .on('paused', err => console.error)
    .on('active', () => console.info('DB replication active.'))
    .on('denied', err => console.error)
    .on('complete', info => console.info)
    .on('error', err => console.error);
}
// @ts-ignore
usersDB.useAsAuthenticationDB();

const useAuth = () => {
  const [addAdminRole, setAddAdminRole] = useState(false);
  const [userDocCount, setUserDocCount] = useState(-999); // magic number
  const user = JSON.parse(window.sessionStorage.getItem('stp:user') || 'null');

  useEffect(() => {
    const contoller = new AbortController();
    let isCancelled = false;
    // If there are no users in the _users database, the login screen should
    // display a confirmPassword field, and we'll set that user as an admin.
    (async () => {
      let doc_count = 0;
      try {
        const result = await usersDB.info();
        doc_count = result.doc_count - 1;
        if (isCancelled) return;
        if (doc_count <= 1) setAddAdminRole(true);
        setUserDocCount(doc_count);
      } catch (error) {
        console.error(error);
      }
    })();
    return () => {
      isCancelled = true;
      contoller.abort();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    roles: string[],
    signIn: boolean
  ) => {
    if (addAdminRole) {
      roles.push('admin');
    }
    try {
      // @ts-ignore
      const result = await usersDB.signUp(email, password, { roles });
      signIn &&
        window.sessionStorage.setItem(
          'stp:user',
          JSON.stringify({ name: email, roles })
        );
      console.log(result);
      return result;
    } finally {
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      // @ts-ignore
      const result = await usersDB.logIn(email, password);
      delete result.ok;
      window.sessionStorage.setItem('stp:user', JSON.stringify(result));
      return result;
    } finally {
    }
  };

  const logOut = async () => {
    try {
      // @ts-ignore
      const result = await usersDB.logOut(); // eslint-disable-line @typescript-eslint/no-unused-vars
      window.sessionStorage.removeItem('stp:user');
    } catch (error) {
      console.error(error);
    }
  };

  const isAdminUser = (): boolean => {
    const user: IAuthUser = JSON.parse(
      window.sessionStorage.getItem('stp:user') || 'null'
    );
    const isAdminUser = user && user.roles.includes('admin');
    return isAdminUser;
  };

  return { userDocCount, signUp, logIn, logOut, user, isAdminUser, usersDB };
};

export default useAuth;
