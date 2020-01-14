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
        if (doc_count === 0) setAddAdminRole(true);
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

  const logIn = async (email: string, password: string) => {
    try {
      // @ts-ignore
      const result = await usersDB.logIn(email, password);
      window.sessionStorage.setItem("stp:user", JSON.stringify(result));
      console.log(result);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      // @ts-ignore
      const result = await usersDB.logOut();
      window.sessionStorage.removeItem("stp:user");
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (email: string, password: string) => {
    const roles = ["instructor"];
    if (addAdminRole) roles.push("admin");
    try {
      // @ts-ignore
      const result = await usersDB.signUp(email, password, { roles });
      window.sessionStorage.setItem("stp:user", JSON.stringify(result));
      console.log(result);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const session = async () => {
    try {
      // @ts-ignore
      const result = await usersDB.session();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return { userDocCount, signUp, logIn, logOut, session, user };
};

export default useAuth;
