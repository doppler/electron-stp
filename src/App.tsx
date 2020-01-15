import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateAdminLogin from "./components/CreateAdminLogin";
import AppRouter from "./components/AppRouter";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <CreateAdminLogin />
          </Route>
          <PrivateRoute path="/">
            <AppRouter />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
