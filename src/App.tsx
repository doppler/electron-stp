import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateAdminLogin from "./components/CreateAdminLogin";
import Home from "./components/Home";
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
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
