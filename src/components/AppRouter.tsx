import '../App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import SettingsRouter from './Settings';
import StudentRouter from './Students';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  return (
    <>
      <Header />
      <div className="Main">
        <Switch>
          <Route exact path="/">
            <StudentRouter />
          </Route>
          <PrivateRoute path="/settings">
            <SettingsRouter />
          </PrivateRoute>
        </Switch>
      </div>
    </>
  );
};

export default AppRouter;
