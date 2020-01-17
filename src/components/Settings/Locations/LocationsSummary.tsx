import React, { useState, useEffect, SetStateAction } from 'react';
import { MdAddBox } from 'react-icons/md';
import { useRouteMatch, Link } from 'react-router-dom';
import useDB from '../../../useDB';

const LocationsSummary = () => {
  const { find } = useDB();
  const match = useRouteMatch();

  const [locations, setLocations]: [
    TLocations,
    React.Dispatch<SetStateAction<[]>>
  ] = useState([]);

  useEffect(() => {
    (async () => {
      const locations = await find({ selector: { type: 'location' } });
      setLocations(locations);
    })();
  }, [find]);

  return (
    <div className="Locations panel">
      <div className="panel-header">
        <h2 className="panel-title">Locations</h2>
        <Link to={`${match.url}/location/NEW`}>
          <button className="icon">
            <MdAddBox />
          </button>
        </Link>
      </div>
      <div className="panel-body">
        <ul className="location-list">
          {locations.map((location: TLocation) => (
            <Link
              key={location.code}
              to={`${match.url}/location/${location.code}`}
            >
              <li>
                <div>{location.code}</div>
                <div>{location.name}</div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationsSummary;
