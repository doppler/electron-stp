import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import useDB from '../../../useDB';
import { sessionBoolean } from '../../../utils';
import { Button } from '../../FormComponents';

const LocationsSummary: React.FC = () => {
  const { find } = useDB();
  const match = useRouteMatch();

  const [locations, setLocations] = useState<any>([]);
  const [showLocationDetails, toggleShowDetails] = useState(
    sessionBoolean('showLocationDetails')
  );

  useEffect(() => {
    (async () => {
      const locations = await find({ selector: { type: 'location' } });
      setLocations(locations);
    })();
  }, [find]);

  useEffect(() => {
    sessionBoolean({ showLocationDetails });
  }, [showLocationDetails]);

  const handleSummaryClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    toggleShowDetails((prevState: boolean) => !prevState);
  };

  return (
    <details open={showLocationDetails} className='Locations panel'>
      <summary onClick={handleSummaryClick}>
        {Object.keys(locations).length} Locations
      </summary>
      <div className='panel-body'>
        <ul className='settings-list'>
          {locations.map((location: ILocation) => (
            <Link
              key={location.code}
              to={`${match.url}/location/${location.code}`}
            >
              <li>
                <div>{location.dzname}</div>
                <div>{location.code}</div>
              </li>
            </Link>
          ))}
        </ul>
        <Link to={`${match.url}/location/NEW`}>
          <Button>Add Location</Button>
        </Link>
      </div>
    </details>
  );
};

export default LocationsSummary;
