import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import useDB from '../../../useDB';
import { sessionBoolean } from '../../../utils';
import { Button, Details } from '../../FormComponents';

const InstructorSummary: React.FC = () => {
  const { find } = useDB();
  const match = useRouteMatch();

  const [instructorList, setInstructorList] = useState<any>([]);
  const [showInstructorDetails, toggleShowDetails] = useState(
    sessionBoolean('showInstructorDetails')
  );

  useEffect(() => {
    (async () => {
      const instructorList = await find({ selector: { type: 'instructor' } });
      setInstructorList(instructorList);
    })();
  }, [find]);

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
        <ul className='settings-list instructors'>
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
        </ul>
        <Link to={`${match.url}/instructor/NEW`}>
          <Button>Add Instructor</Button>
        </Link>
      </div>
    </Details>
  );
};

export default InstructorSummary;
