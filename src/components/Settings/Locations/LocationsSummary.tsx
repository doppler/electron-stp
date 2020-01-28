import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import useDB from '../../../useDB';

const LocationsSummary: React.FC = () => {
  const { find } = useDB();
  const match = useRouteMatch();

  const [locations, setLocations] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const locations = await find({ selector: { type: 'location' } });
      setLocations(locations);
    })();
  }, [find]);

  return (
    <div className='Locations panel'>
      <div className='panel-header'>
        <h2 className='panel-title'>Locations</h2>
        <Link to={`${match.url}/location/NEW`}>
          <button>Add Location</button>
        </Link>
      </div>
      <div className='panel-body'>
        <ul className='settings-list'>
          {locations.map((location: ILocation) => (
            <Link
              key={location.code}
              to={`${match.url}/location/${location.code}`}
            >
              <li>
                <div>{location.name}</div>
                <div>{location.code}</div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationsSummary;
