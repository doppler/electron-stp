import "./Settings.css";
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Locations from "./Locations";

const SettingsRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <div className="Settings">
          <h1>Settings</h1>
          <Locations />
        </div>
      </Route>
    </Switch>
  );
};

export default SettingsRouter;
