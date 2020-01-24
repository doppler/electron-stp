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
