import React, { useEffect, useState, useCallback, useRef } from 'react';
import useAuth from './useAuth';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup, Panel, Text } from '../FormComponents';
import styled from 'styled-components';

const LOGOUT_DELAY = 30;

const LogoutPanel = styled(Panel)`
  width: 30em;
  margin-left: calc(50vw - 15em);
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logout = () => {
  const { logOut } = useAuth();
  const history = useHistory();
  const [timeRemaining, setTimeRemaining] = useState(LOGOUT_DELAY);
  const logOutButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    logOutButtonRef.current && logOutButtonRef.current.focus();
  }, []);

  const handleBackButtonClick = () => {
    history.goBack();
  };

  return (
    <LogoutPanel>
      <Text warning>Logging out in {timeRemaining} seconds</Text>
      <ButtonGroup>
        <Button className='warning' onClick={handleBackButtonClick}>
          Cancel
        </Button>
        <Button onClick={() => logOutNow()} ref={logOutButtonRef}>
          Log out now
        </Button>
      </ButtonGroup>
    </LogoutPanel>
  );
};

export default Logout;
