import PouchDB from "pouchdb";
import { useState } from "react";

PouchDB.plugin(require("pouchdb-auth"));

const usersDB = new PouchDB("_users");
usersDB.useAsAuthenticationDB();

const useAuth = () => {
  const [addAdminRole, setAddAdminRole] = useState(false);

  // return the number of user docs, which is the number of docs
  // in the database -1, which is the design doc
  const userDocCount = async () => {
    let doc_count = 0;
    try {
      const result = await usersDB.info();
      doc_count = result.doc_count - 1;
      if (doc_count === 0) setAddAdminRole(true);
    } catch (error) {
      console.error(error);
    }
    return doc_count;
  };

  const logIn = async (email, password) => {
    try {
      const result = await usersDB.logIn(email, password);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (email, password) => {
    const roles = ["instructor"];
    if (addAdminRole) roles.push("admin");
    try {
      const result = await usersDB.signUp(email, password, { roles });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return { userDocCount, signUp, logIn };
};

export default useAuth;
