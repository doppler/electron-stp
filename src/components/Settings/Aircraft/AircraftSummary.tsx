import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { sessionBoolean } from '../../../utils';
import { Button, Details, SummaryList } from '../../FormComponents';
import useFindAll from '../../../utils/useFindAll';

const AircraftSummary: React.FC = () => {
  const match = useRouteMatch();

  const [showAircraftDetails, toggleShowDetails] = useState(
    sessionBoolean('showAircraftDetails')
  );

  const selector: React.Ref<useFindAllArg> = useRef({
    selector: { type: 'aircraft' }
  });
  const aircraftList = useFindAll(selector);

  useEffect(() => {
    sessionBoolean({ showAircraftDetails });
  }, [showAircraftDetails]);

  const handleSummaryClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    toggleShowDetails((prevState: boolean) => !prevState);
  };

  return (
    <Details open={showAircraftDetails}>
      <summary onClick={handleSummaryClick}>
        {Object.keys(aircraftList).length} Aircraft
      </summary>
      <div className='panel-body'>
        <SummaryList>
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
        </SummaryList>
        <Link to={`${match.url}/aircraft/NEW`}>
          <Button>Add Aircraft</Button>
        </Link>
      </div>
    </Details>
  );
};

export default AircraftSummary;
