import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import useDB from '../../useDB';
import format from 'date-fns/format';
import { Button } from '../FormComponents';

const StudentLog: React.FC = () => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { DB } = useDB();
  const [student, setStudent]: [IStudent, any] = useState<any>({});
  const [jumps, setJumps]: [TJumpList, any] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const result = await DB.allDocs({
        startkey: params.id,
        endkey: `${params.id}:jump:999`,
        include_docs: true
      });
      console.log({ result });
      const [student, ...jumps] = result.rows;
      setStudent(student.doc);
      setJumps(jumps.map(jump => jump.doc));
    })();
  }, [DB, params]);

  return (
    <div>
      <Link to={`/student/${student._id}`}>
        <h1>{student.name}</h1>
      </Link>
      <Link to={`/student/${student._id}/jump/NEW`}>
        <Button>New Jump</Button>
      </Link>
      <table>
        <tbody>
          {jumps.map(jump => (
            <tr
              key={jump._id}
              onClick={() =>
                history.push(`/student/${student._id}/jump/${jump.jumpNumber}`)
              }
            >
              <td>{format(Date.parse(jump.date), 'EEE MMM do')}</td>
              <td>{jump.jumpNumber}</td>
              <td>{jump.diveFlow}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentLog;
