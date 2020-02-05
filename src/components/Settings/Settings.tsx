import React from 'react';
import { LocationsSummary } from './Locations';
import { AircraftSummary } from './Aircraft';
import { InstructorSummary } from './Instructors';
// import { UserSummary } from './Users';
import { DatabaseSummary } from './Database';

const Settings = () => {
  return (
    <div className='Settings'>
      <h1>Settings</h1>
      <InstructorSummary />
      <AircraftSummary />
      <LocationsSummary />
      <DatabaseSummary />
      {/* <UserSummary /> */}
    </div>
  );
};

export default Settings;
