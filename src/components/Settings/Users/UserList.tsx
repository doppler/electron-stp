import React, { SetStateAction, useState, useEffect } from 'react';
import useAuth from '../../Auth/useAuth';

const UserSummary: React.FC = () => {
  const { usersDB } = useAuth();

  const [users, setUsers]: [any, any] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await usersDB.allDocs({ include_docs: true });
      const users = result.rows
        .filter(row => row.id.match(/^org\.couchdb\.user/))
        .map(row => row.doc);
      setUsers(users);
    })();
  }, [usersDB]);
  return (
    <div className="Users panel">
      <div className="panel-header">
        <h2 className="panel-title">Users</h2>
      </div>
      <div className="panel-body">
        <ul className="settings-list">
          {users.map((user: any) => (
            <li key={user._id}>
              <code>
                {JSON.stringify(
                  { name: user.name, roles: user.roles },
                  null,
                  2
                )}
              </code>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserSummary;
