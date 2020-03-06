import React, { useState, useEffect } from 'react';
import { Button } from '../FormComponents';
import { Link, useHistory } from 'react-router-dom';
import useDB from '../../useDB';

const ListStudents: React.FC = () => {
  const history = useHistory();
  const { DB } = useDB();
  const [students, setStudents]: [IStudent[], any] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const res = await DB.query('queries/location_latest_jump', {
        descending: true,
        startkey: ['ATL', '9999'],
        endkey: ['ATL'],
        include_docs: true
      });
      setStudents(res.rows.map(row => row.doc));
    })();
  }, [DB]);

  return (
    <div className='ListStudents'>
      <table>
        <tbody>
          {students.map(student => (
            <tr
              key={student._id}
              onClick={() => history.push(`/student/${student._id}/jumps`)}
            >
              <td>{student.name}</td>
              <td>{student.latestJump?.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button>
        <Link to={`/student/NEW`}>New Student</Link>
      </Button>
    </div>
  );
};
export default ListStudents;
