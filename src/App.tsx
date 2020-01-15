import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateAdminLogin from "./components/CreateAdminLogin";
import AppRouter from "./components/AppRouter";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Auth/Logout";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <CreateAdminLogin />
          </Route>
          <Route path="/logout">
            <Logout />
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
