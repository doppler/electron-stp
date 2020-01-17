import './Logout.css';
import React, { useEffect, useState, useCallback } from 'react';
import useAuth from './useAuth';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const { logOut } = useAuth();
  const history = useHistory();
  const [timeRemaining, setTimeRemaining] = useState(5);

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
    <div className="Logout">
      <button onClick={() => logOutNow()}>Log out now</button>
      <p>Logging out in {timeRemaining} seconds</p>
      <button onClick={handleBackButtonClick}>Cancel</button>
    </div>
  );
};

export default Logout;
