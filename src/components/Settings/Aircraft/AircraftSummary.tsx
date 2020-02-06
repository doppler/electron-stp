import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import useDB from '../../../useDB';
import { sessionBoolean } from '../../../utils';
import { Button, Details, SummaryList } from '../../FormComponents';

const AircraftSummary: React.FC = () => {
  const { find } = useDB();
  const match = useRouteMatch();

  const [aircraftList, setAircraftList] = useState<any>([]);
  const [showAircraftDetails, toggleShowDetails] = useState(
    sessionBoolean('showAircraftDetails')
  );

  useEffect(() => {
    (async () => {
      const aircraftList = await find({ selector: { type: 'aircraft' } });
      setAircraftList(aircraftList);
    })();
  }, [find]);

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
