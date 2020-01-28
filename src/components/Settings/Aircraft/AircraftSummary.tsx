import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import useDB from '../../../useDB';

const AircraftSummary: React.FC = () => {
  const { find } = useDB();
  const match = useRouteMatch();

  const [aircraftList, setAircraftList] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const aircraftList = await find({ selector: { type: 'aircraft' } });
      setAircraftList(aircraftList);
    })();
  }, [find]);

  return (
    <div className='AircraftList panel'>
      <div className='panel-header'>
        <h2 className='panel-title'>Aircraft</h2>
        <Link to={`${match.url}/aircraft/NEW`}>
          <button>Add Aircraft</button>
        </Link>
      </div>
      <div className='panel-body'>
        <ul className='settings-list aircraft'>
          {aircraftList.map((aircraft: IAircraft) => (
            <Link
              key={aircraft.tailNumber}
              to={`${match.url}/aircraft/${aircraft.tailNumber}`}
            >
              <li>
                <div>{aircraft.model}</div>
                <div>{aircraft.tailNumber}</div>
                <div>{aircraft.currentLocation}</div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AircraftSummary;
