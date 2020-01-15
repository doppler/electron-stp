import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const SettingsRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <div className="Settings">
          <h2>Settings</h2>
        </div>
      </Route>
    </Switch>
  );
};

export default SettingsRouter;
