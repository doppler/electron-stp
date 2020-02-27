declare module 'pouchdb-auth';

interface ICouchDocument {
  readonly _rev?: string;
  _id?: string;
  _deleted?: boolean = false;
  type: 'user' | 'location' | 'aircraft' | 'instructor' | 'student' | 'jump';
}

interface IAuthUser {
  name: string;
  roles: string[];
}

interface IValidationError {
  message: string;
  path: string[];
  type: string;
  context: {
    label: string;
    key: string;
    child?: string;
    value?: string;
  };
}

type DBSyncSettings = {
  doSync: boolean;
  url: string;
  username?: string;
  password?: string;
};
