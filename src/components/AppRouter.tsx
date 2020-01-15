import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import SettingsRouter from "./Settings";

const AppRouter = () => {
  return (
    <div>
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
    </div>
  );
};

export default AppRouter;
