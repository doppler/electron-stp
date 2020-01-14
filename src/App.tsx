import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
  useHistory
} from "react-router-dom";
import CreateAdminLogin from "./components/CreateAdminLogin";
import useAuth from "./components/Auth/useAuth";

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

const Home = () => {
  const { logOut, user } = useAuth();
  const history = useHistory();
  const handleLogOutClick = () => {
    logOut();
    history.push("/login");
  };
  return (
    <div>
      <button onClick={handleLogOutClick}>Log out</button>
      <div>
        <code>{JSON.stringify(user, null, 2)}</code>
      </div>
    </div>
  );
};

interface PrivateRouteProps extends RouteProps {
  children?: any;
}
const PrivateRoute = (props: PrivateRouteProps) => {
  const { children, ...rest } = props;
  const user = JSON.parse(window.sessionStorage.getItem("stp:user") || "null");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
