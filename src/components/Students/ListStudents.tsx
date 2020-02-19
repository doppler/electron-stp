import React from 'react';
import { Button } from '../FormComponents';
import { Link } from 'react-router-dom';
import useFindAll from '../../utils/useFindAll';

const ListStudents: React.FC = () => {
  const students = useFindAll({ selector: { type: 'student' } });

  return (
    <div className='ListStudents'>
      <h1>Listing Students</h1>
      <ul>
        {students.map((student: IStudent) => (
          <li key={student._id}>{student.name}</li>
        ))}
      </ul>
      <Button>
        <Link to={`/student/NEW`}>New Student</Link>
      </Button>
    </div>
  );
};

export default ListStudents;
