import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import SettingsRouter from "./Settings";
import DBContext from "./DBContext";
import PouchDB from "pouchdb";
const DB = new PouchDB("stp");

const AppRouter = () => {
  return (
    <DBContext.Provider value={DB}>
      <Header />
      <div className="Main">
        <Switch>
          <Route exact path="/">
            <div>
              <h2>Hello</h2>
            </div>
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
