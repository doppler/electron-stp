import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDB from '../../useDB';

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

  return <code>{student._id}</code>;
};

export default StudentLog;
