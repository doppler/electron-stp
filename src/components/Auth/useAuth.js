import PouchDB from "pouchdb";

PouchDB.plugin(require("pouchdb-auth"));

const db = new PouchDB("_users");
db.useAsAuthenticationDB();

const useAuth = () => {
  const logIn = async (email, password) => {
    try {
      const result = await db.logIn(email, password);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (email, password) => {
    try {
      const result = await db.signUp(email, password);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return { signUp, logIn };
};

export default useAuth;
