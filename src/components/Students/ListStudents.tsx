import React, { useState, useEffect } from 'react';
import useDB from '../../useDB';
import { Button } from '../FormComponents';
import { Link } from 'react-router-dom';

const ListStudents: React.FC = () => {
  const { find } = useDB();
  const [students, setStudents] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const studentList = await find({ selector: { type: 'student' } });
      setStudents(studentList);
    })();
  }, [find]);

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
