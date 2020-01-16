import PouchDB from "pouchdb";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
PouchDB.plugin(require("pouchdb-auth"));

const usersDB = new PouchDB("_users");
// @ts-ignore
usersDB.useAsAuthenticationDB();

const useAuth = () => {
  const history = useHistory();
  const [addAdminRole, setAddAdminRole] = useState(false);
  const [userDocCount, setUserDocCount] = useState(0);
  const user = JSON.parse(window.sessionStorage.getItem("stp:user") || "null");

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

  const signUp = async (email: string, password: string) => {
    const roles = [];
    if (addAdminRole) {
      roles.push("admin");
    }
    try {
      // @ts-ignore
      const result = await usersDB.signUp(email, password, { roles });
      window.sessionStorage.setItem(
        "stp:user",
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
      window.sessionStorage.setItem("stp:user", JSON.stringify(result));
      return result;
    } finally {
    }
  };

  const logOut = async () => {
    try {
      // @ts-ignore
      const result = await usersDB.logOut(); // eslint-disable-line @typescript-eslint/no-unused-vars
      window.sessionStorage.removeItem("stp:user");
    } catch (error) {
      console.error(error);
    }
  };

  return { userDocCount, signUp, logIn, logOut, user };
};

export default useAuth;
