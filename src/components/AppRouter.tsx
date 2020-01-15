import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";

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
        </Switch>
      </div>
    </div>
  );
};

export default AppRouter;
