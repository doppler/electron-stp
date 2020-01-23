import React from 'react';
import { LocationsSummary } from './Locations';
import { AircraftSummary } from './Aircraft';
import { InstructorSummary } from './Instructors';
import { UserSummary } from './Users';

const Settings = () => {
  return (
    <div className="Settings">
      <h1>Settings</h1>
      <LocationsSummary />
      <AircraftSummary />
      <InstructorSummary />
      <UserSummary />
    </div>
  );
};

export default Settings;
