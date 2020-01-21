import React from 'react';
import { LocationsSummary } from './Locations';
import AircraftSummary from './Aircraft';

const Settings = () => {
  return (
    <div className="Settings">
      <h1>Settings</h1>
      <LocationsSummary />
      <AircraftSummary />
    </div>
  );
};

export default Settings;
