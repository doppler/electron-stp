import React from 'react';
import { LocationsSummary } from './Locations';
import { AircraftSummary } from './Aircraft';
import { InstructorSummary } from './Instructors';

const Settings = () => {
  return (
    <div className="Settings">
      <h1>Settings</h1>
      <LocationsSummary />
      <AircraftSummary />
      <InstructorSummary />
    </div>
  );
};

export default Settings;
