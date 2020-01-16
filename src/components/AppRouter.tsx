import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import SettingsRouter from "./Settings";
import DBContext from "./DBContext";
import PouchDB from "pouchdb";
import PouchDBfind from "pouchdb-find";
import StudentRouter from "./Students";
PouchDB.plugin(PouchDBfind);

const DB = new PouchDB("stp");

const AppRouter = () => {
  useEffect(() => {
    (async () => {
      const res = await DB.getIndexes();
      const indexNames = res.indexes.map(i => i.name);
      if (!indexNames.includes("type")) {
        const idxRes = await DB.createIndex({
          index: {
            fields: ["type"],
            ddoc: "by",
            name: "type"
          }
        });
        console.log(idxRes);
      }
    })();
  }, []);

  return (
    <DBContext.Provider value={DB}>
      <Header />
      <div className="Main">
        <Switch>
          <Route exact path="/">
            <StudentRouter />
          </Route>
          <Route path="/settings">
            <SettingsRouter />
          </Route>
        </Switch>
      </div>
    </DBContext.Provider>
  );
};

export default AppRouter;
