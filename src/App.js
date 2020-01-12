import "./App.css";
import React from "react";
import CreateAdminLogin from "./components/CreateAdminLogin";
import DbContext from "./components/dbContext";
import PouchDB from "pouchdb";
PouchDB.plugin(require("pouchdb-auth"));

const App = () => {
  const db = new PouchDB("_users");
  db.useAsAuthenticationDB();
  return (
    <DbContext.Provider value={db}>
      <div className="App">
        <CreateAdminLogin />
      </div>
    </DbContext.Provider>
  );
};

export default App;
