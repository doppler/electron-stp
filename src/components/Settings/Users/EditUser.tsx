import React, { useState, useEffect } from 'react';
import useAuth from '../../Auth/useAuth';
import { useParams, useHistory } from 'react-router-dom';
import DeleteDocInput from '../../DeleteDocInput';

type Params = {
  id?: string;
};

interface User {
  readonly _id: string;
  readonly _rev: string;
  _deleted?: boolean;
  name: string;
  roles: string[];
}

const INITIAL_STATE: User = {
  _id: 'org.couchdb.user:doppler2@gmail.com',
  _rev: '',
  _deleted: false,
  roles: [],
  name: ''
};

const EditUser: React.FC = () => {
  const history = useHistory();
  const { usersDB } = useAuth();
  const params: Params = useParams();
  const [user, setUser]: [User, any] = useState(INITIAL_STATE);

  useEffect(() => {
    (async () => {
      const result = await usersDB.get(`${params.id}`);
      // @ts-ignore
      const { name, roles, _id, _rev } = result;
      setUser({ name, roles, _id, _rev, _deleted: INITIAL_STATE._deleted });
    })();
  }, [usersDB, params.id]);

  const handleSubmit = async () => {
    console.info('Deleting user');
    try {
      const result = await usersDB.put({
        _id: user._id,
        _rev: user._rev,
        _deleted: user._deleted
      });
      console.info(result);
      history.go(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <code>{JSON.stringify(user, null, 2)}</code>
      <form className="clean">
        <div className="button-row">
          <DeleteDocInput
            setValues={setUser}
            idValue={user._id}
            handleSubmit={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default EditUser;
