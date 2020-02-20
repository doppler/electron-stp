import jwt from 'jsonwebtoken';
import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-auth'));

const usersDB = new PouchDB('_users', { auto_compaction: true });

const token = localStorage.getItem('stp:dbSyncSettings');

let dbSyncSettings: any = {};
if (token) dbSyncSettings = jwt.verify(token, process.env.NODE_ENV);

if (dbSyncSettings.doSync) {
  const remoteUsersDB = new PouchDB(
    dbSyncSettings.url.replace(/\/[\w]+$/, '/_users'),
    {
      auth: {
        username: dbSyncSettings.username,
        password: dbSyncSettings.password
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
    .on('change', info => {
      console.info(info);
      if (info.change.docs.length > 1)
        window.localStorage.setItem('stp:isFirstRun', 'false');
    })
    .on('active', () => console.info('DB replication active.'))
    .on('complete', info => console.info(info))
    .on('error', error => console.error(error))
    .on('denied', error => console.error(error));
}
// @ts-ignore
usersDB.useAsAuthenticationDB();

const useAuth = () => {
  const addAdminRole = JSON.parse(
    window.localStorage.getItem('stp:isFirstRun') || 'true'
  );
  const user = JSON.parse(window.sessionStorage.getItem('stp:user') || 'null');

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
    } catch (error) {
      console.error(error);
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      // @ts-ignore
      const result = await usersDB.logIn(email, password);
      delete result.ok;
      window.sessionStorage.setItem('stp:user', JSON.stringify(result));
      return result;
    } catch (error) {
      return error;
    }
  };

  const logOut = async () => {
    try {
      // @ts-ignore
      const result = await usersDB.logOut();
      console.info(result);
      window.sessionStorage.removeItem('stp:user');
    } catch (error) {
      console.error(error);
    }
  };

  const isAdminUser = (): boolean => {
    const user: IAuthUser = JSON.parse(
      window.sessionStorage.getItem('stp:user') || 'null'
    );
    // If there are no users yet, let first user admin
    const isAdminUser = addAdminRole || (user && user.roles.includes('admin'));
    return isAdminUser;
  };

  const isInstructor = (): boolean => {
    const user: IAuthUser = JSON.parse(
      window.sessionStorage.getItem('stp:user') || 'null'
    );
    const isInstructor = user && user.roles.includes('instructor');
    return isInstructor;
  };
  return {
    addAdminRole,
    signUp,
    logIn,
    logOut,
    user,
    isAdminUser,
    isInstructor,
    usersDB
  };
};

export default useAuth;
