import '../App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import SettingsRouter from './Settings';
import StudentRouter from './Students';

const AppRouter = () => {
  return (
    <>
      <Header />
      <div className="Main">
        <Switch>
          <Route exact path="/">
            <StudentRouter />
          </Route>
          <Route path="/settings">
            <SettingsRouter />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default AppRouter;
