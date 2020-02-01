import './Logout.css';
import React, { useEffect, useState, useCallback } from 'react';
import useAuth from './useAuth';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup } from '../FormComponents';
const Logout = () => {
  const { logOut } = useAuth();
  const history = useHistory();
  const [timeRemaining, setTimeRemaining] = useState(60);

  const logOutNow = useCallback(() => {
    logOut();
    history.replace('/login');
  }, [history, logOut]);

  useEffect(() => {
    if (timeRemaining <= 0) logOutNow();

    const timeout = setTimeout(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [timeRemaining, logOutNow]);

  const handleBackButtonClick = () => {
    history.goBack();
  };

  return (
    <div className='Logout'>
      <p className='warning'>Logging out in {timeRemaining} seconds</p>
      <ButtonGroup>
        <Button className='warning' onClick={handleBackButtonClick}>
          Cancel
        </Button>
        <Button onClick={() => logOutNow()}>Log out now</Button>
      </ButtonGroup>
    </div>
  );
};

export default Logout;
