import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { sessionBoolean } from '../../../utils';
import { Button, Details, SummaryList } from '../../FormComponents';
import useFindAll from '../../../utils/useFindAll';

const LocationsSummary: React.FC = () => {
  const match = useRouteMatch();

  const [showLocationDetails, toggleShowDetails] = useState(
    sessionBoolean('showLocationDetails')
  );

  const selector: React.Ref<useFindAllArg> = useRef({
    selector: { type: 'location' }
  });
  const locations = useFindAll(selector);

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
