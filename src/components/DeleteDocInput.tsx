import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from './FormComponents';
import styled from 'styled-components';

const StyledDeleteDocInput = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  & .dialog {
    position: absolute;
    top: 0;
    display: block;
    z-index: 1;
    width: 20em;
    color: var(--warning-bright);
    background-color: var(--warning-dark);
    border: 1px solid var(--warning-bright);
  }
  & .dialog-header {
    position: relative;
    display: flex;
    padding: 0.25em;
    border-bottom: 1px solid var(--warning-bright);
    & .close-button {
      position: absolute;
      right: 0.25em;
      width: 1em;
      height: 1em;
      display: flex;
      justify-content: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
  & .hidden {
    display: none;
  }
  & input {
    text-align: center;
    width: 100%;
  }
  & .verified {
    color: var(--success-bright);
    background-color: var(--success-dark);
    border: 1px solid var(--success-bright);
  }
`;

const DeleteDocInput = (props: any) => {
  const { setValues, idValue, handleSubmit } = props;
  const [verified, setVerified] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(document.createElement('div'));
  const verificationRef = useRef<HTMLInputElement>(
    document.createElement('input')
  );

  const [verificationString, setVerificationString] = useState('');

  const handleChange = (event: any) => {
    setVerificationString(event.currentTarget.value);
  };

  useEffect(() => {
    let _deleted = verificationString === idValue;
    setVerified(_deleted);
    setValues((prevValues: any) => ({
      ...prevValues,
      _deleted
    }));
  }, [verificationString, idValue, setValues]);

  const toggleDialog = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dialogRef.current.classList.toggle('hidden');
    verificationRef.current.focus();
  };

  const handleVerificationDialogKeypress = (event: React.KeyboardEvent) => {
    event.persist();
    if (event.key === 'Escape') {
      setVerificationString('');
      toggleDialog(event);
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (verificationString === idValue) handleSubmit(event);
    }
  };
  return (
    <StyledDeleteDocInput>
      <Button className='warning' onClick={toggleDialog}>
        Delete
      </Button>
      <div id='foo' className={`dialog hidden`} ref={dialogRef}>
        <div className='dialog-header'>
          <div>To verify deletion, enter &quot;{idValue}&quot;.</div>
          <div className='close-button' onClick={toggleDialog}>
            {String.fromCharCode(10754)}
          </div>
        </div>
        <div className='dialog-body'>
          <Input
            name='verificationString'
            value={verificationString}
            onChange={handleChange}
            autoComplete={'off'}
            className={`${verified ? 'verified' : ''}`}
            ref={verificationRef}
            onKeyDown={handleVerificationDialogKeypress}
          />
        </div>
      </div>
    </StyledDeleteDocInput>
  );
};

export default DeleteDocInput;
