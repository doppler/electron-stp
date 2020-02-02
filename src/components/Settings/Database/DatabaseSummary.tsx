import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { sessionBoolean } from '../../../utils';
import {
  Form,
  Field,
  Label,
  Input,
  Button,
  Details
} from '../../FormComponents';
const token = window.localStorage.getItem('stp:dbSyncSettings');

const initialState: any = token
  ? jwt.verify(token, process.env.NODE_ENV)
  : { url: '', doSync: false, username: '', password: '' };

const DatabaseSummary = () => {
  const [showDatabaseDetails, toggleShowDetails] = useState(
    sessionBoolean('showDatabaseDetails')
  );
  const [status, setStatus] = useState(
    initialState.doSync
      ? 'syncing'
      : initialState.url
      ? 'set but not syncing'
      : 'syncing not set up'
  );
  const [error, setError] = useState<null | string>(null);
  const [dbConnection, setDbConnection] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<any>) => {
    event.persist();
    setDbConnection((prevState: DBSyncSettings) => ({
      ...prevState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    setStatus('checking...');

    if (
      !dbConnection.url.match(
        /^http(s?):\/\/(([\w]+)|([\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}))(:[\d]+)?\/[\w]+$/
      )
    ) {
      setError('url must be of format http(s)://host(:port)/db');
    } else setError(null);

    try {
      const response = await fetch(
        dbConnection.url.replace(/[\w]+$/, '_session'),
        {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: dbConnection.username,
            password: dbConnection.password
          })
        }
      );
      setStatus(`${response.status} ${response.statusText}`);
      if (response.ok) {
        window.localStorage.setItem(
          `stp:dbSyncSettings`,
          jwt.sign(dbConnection, process.env.NODE_ENV)
        );
      } else window.localStorage.removeItem('stp:dbSyncSettings');
    } catch (error) {
      console.error(error);
      setStatus(error.message);
      window.localStorage.removeItem('stp:dbSyncSettings');
    }
  };

  useEffect(() => {
    sessionBoolean({ showDatabaseDetails });
  }, [showDatabaseDetails]);

  const handleSummaryClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    toggleShowDetails((prevState: boolean) => !prevState);
  };

  return (
    <Details open={showDatabaseDetails}>
      <summary onClick={handleSummaryClick}>Database {status}</summary>
      <div className='panel-body'>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Remote DB</Label>
            <Input
              id='url'
              name='url'
              type='text'
              onChange={handleChange}
              value={dbConnection.url}
              style={{ fontFamily: 'monospace' }}
            />
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              id='username'
              name='username'
              type='password'
              onChange={handleChange}
              value={dbConnection.username}
            />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              onChange={handleChange}
              value={dbConnection.password}
            />
          </Field>
          <Field className='checkbox'>
            <Label htmlFor='doSync'>Sync?</Label>
            <Input
              id='doSync'
              name='doSync'
              type='checkbox'
              onChange={handleChange}
              checked={dbConnection.doSync}
              style={{ float: 'left' }}
            />
          </Field>
          <Button>Save</Button>
        </Form>
        {error && <p className='error'>{error}</p>}
        <code>status: {error ? error : status}</code>
      </div>
    </Details>
  );
};

export default DatabaseSummary;
