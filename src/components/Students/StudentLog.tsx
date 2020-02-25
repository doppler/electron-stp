import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useDB from '../../useDB';
import { Button } from '../FormComponents';

const StudentLog: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { get } = useDB();
  const [student, setStudent]: [IStudent, any] = useState<any>({});

  useEffect(() => {
    (async () => {
      const doc = await get(params.id);
      setStudent(doc);
    })();
  }, [get, params]);

  return (
    <div>
      <Link to={`/student/${student._id}`}>
        <h1>{student.name}</h1>
      </Link>
      <Link to={`/student/${student._id}/jump/NEW`}>
        <Button>New Jump</Button>
      </Link>
    </div>
  );
};

export default StudentLog;
