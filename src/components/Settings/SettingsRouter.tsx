import './Settings.css';
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Settings from './Settings';
import { EditLocation } from './Locations';
import { EditAircraft } from './Aircraft';

const SettingsRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <Settings />
      </Route>
      <Route path={`${match.url}/location/:code`}>
        <EditLocation />
      </Route>
      <Route path={`${match.url}/aircraft/:tailNumber`}>
        <EditAircraft />
      </Route>
    </Switch>
  );
};

export default SettingsRouter;
