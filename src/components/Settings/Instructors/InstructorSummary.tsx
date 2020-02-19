import React, { useState, useEffect, useRef } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { sessionBoolean } from '../../../utils';
import { Button, Details, SummaryList } from '../../FormComponents';
import useFindAll from '../../../utils/useFindAll';

const InstructorSummary: React.FC = () => {
  const match = useRouteMatch();

  const [showInstructorDetails, toggleShowDetails] = useState(
    sessionBoolean('showInstructorDetails')
  );

  const selector: React.Ref<useFindAllArg> = useRef({
    selector: { type: 'instructor' }
  });
  const instructorList = useFindAll(selector);

  useEffect(() => {
    sessionBoolean({ showInstructorDetails });
  }, [showInstructorDetails]);

  const handleSummaryClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    toggleShowDetails((prevState: boolean) => !prevState);
  };

  return (
    <Details open={showInstructorDetails}>
      <summary onClick={handleSummaryClick}>
        {Object.keys(instructorList).length} Instructors
      </summary>
      <div className='panel-body'>
        <SummaryList>
          {instructorList.map((instructor: IInstructor) => (
            <Link
              key={instructor.uspaNumber?.toString()}
              to={`${match.url}/instructor/${instructor.uspaNumber}`}
            >
              <li>
                <div>{instructor.name}</div>
                <div>{instructor.currentLocation}</div>
              </li>
            </Link>
          ))}
        </SummaryList>
        <Link to={`${match.url}/instructor/NEW`}>
          <Button>Add Instructor</Button>
        </Link>
      </div>
    </Details>
  );
};

export default InstructorSummary;
