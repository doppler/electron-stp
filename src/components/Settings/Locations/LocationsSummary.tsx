import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import useDB from '../../../useDB';
import { sessionBoolean } from '../../../utils';
import { Button, Details, SummaryList } from '../../FormComponents';

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
    <Details open={showLocationDetails}>
      <summary onClick={handleSummaryClick}>
        {Object.keys(locations).length} Locations
      </summary>
      <div className='panel-body'>
        <SummaryList>
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
        </SummaryList>
        <Link to={`${match.url}/location/NEW`}>
          <Button>Add Location</Button>
        </Link>
      </div>
    </Details>
  );
};

export default LocationsSummary;
