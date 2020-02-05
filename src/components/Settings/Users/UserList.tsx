import React, { useState, useEffect } from 'react';
import useAuth from '../../Auth/useAuth';
import { Link, useRouteMatch } from 'react-router-dom';
import { sessionBoolean } from '../../../utils';
import { Details } from '../../FormComponents';

interface IUser {
  _id: string;
  name: string;
  roles: string[];
}
const UserSummary: React.FC = () => {
  const { usersDB } = useAuth();
  const match = useRouteMatch();

  const [users, setUsers] = useState<any>([]);
  const [showUserDetails, toggleShowDetails] = useState(
    sessionBoolean('showUserDetails')
  );

  useEffect(() => {
    (async () => {
      const result = await usersDB.allDocs({ include_docs: true });
      const users = result.rows
        .filter(row => row.id.match(/^org\.couchdb\.user/))
        .map(row => row.doc);
      setUsers(users);
    })();
  }, [usersDB]);

  useEffect(() => {
    sessionBoolean({ showUserDetails });
  }, [showUserDetails]);

  const handleSummaryClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    toggleShowDetails((prevState: boolean) => !prevState);
  };

  return (
    <Details open={showUserDetails}>
      <summary onClick={handleSummaryClick}>
        {Object.keys(users).length} Users
      </summary>
      <div className='panel-body'>
        <ul className='settings-list'>
          {users.map((user: IUser) => (
            <li key={user._id}>
              <Link to={`${match.url}/user/${user._id}`}>
                <code>
                  {JSON.stringify(
                    { name: user.name, roles: user.roles },
                    null,
                    2
                  )}
                </code>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Details>
  );
};

export default UserSummary;
