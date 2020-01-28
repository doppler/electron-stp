import React, { SetStateAction, useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import useDB from '../../../useDB';

const InstructorSummary: React.FC = () => {
  const { find } = useDB();
  const match = useRouteMatch();

  const [instructorList, setInstructorList] = useState<TInstructorList>([]);

  useEffect(() => {
    (async () => {
      const instructorList = await find({ selector: { type: 'instructor' } });
      setInstructorList(instructorList);
    })();
  }, [find]);

  return (
    <div className='InstructorList panel'>
      <div className='panel-header'>
        <h2 className='panel-title'>Instructors</h2>
        <Link to={`${match.url}/instructor/NEW`}>
          <button>Add Instructor</button>
        </Link>
      </div>
      <div className='panel-body'>
        <ul className='settings-list instructors'>
          {instructorList.map(instructor => (
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
      </div>
    </div>
  );
};

export default InstructorSummary;
