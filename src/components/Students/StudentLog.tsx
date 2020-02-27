import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import useDB from '../../useDB';
import { format, parse } from 'date-fns';
import { Button, Panel } from '../FormComponents';

const StudentLog: React.FC = () => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { allDocs } = useDB();
  const [student, setStudent]: [IStudent, any] = useState<any>({});
  const [jumps, setJumps]: [TJumpList, any] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const docs = await allDocs({
        startkey: params.id,
        endkey: `${params.id}:jump:999`,
        include_docs: true
      });
      const [student, ...jumps] = docs;
      setStudent(student);
      setJumps(jumps);
    })();
  }, [allDocs, params]);

  return (
    <Panel>
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
              <td>{jump.jumpNumber}</td>
              <td>{jump.diveFlow}</td>
              <td>
                {format(
                  parse(jump.date, 'yyyy-MM-dd', new Date()),
                  'EEE MMM do'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
};

export default StudentLog;
