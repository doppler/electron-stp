import React from 'react';
import { Button } from '../FormComponents';
import { Link } from 'react-router-dom';
import useFindAll from '../../utils/useFindAll';

const ListStudents: React.FC = () => {
  // const students: IStudent[] = useFindAll({
  //   selector: { type: 'student' }
  // });
  const students: IStudent[] = useFindAll({
    selector: { type: 'student', locations: { $elemMatch: 'ATL' } }
  });

  return (
    <div className='ListStudents'>
      <h1>Listing Students</h1>
      <ul>
        {students.map(student => (
          <Link key={student._id} to={`/student/${student._id}/jumps`}>
            <li key={student._id}>{student.name}</li>
          </Link>
        ))}
      </ul>
      <Button>
        <Link to={`/student/NEW`}>New Student</Link>
      </Button>
    </div>
  );
};
export default ListStudents;
