import React, { useState, useEffect, useRef, SyntheticEvent } from 'react';
import './DeleteDocInput.css';

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

  const toggleDialog = (event: SyntheticEvent) => {
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
    <div className="DeleteDocInput">
      <button className="warning" onClick={toggleDialog}>
        Delete
      </button>
      <div id="foo" className={`dialog hidden`} ref={dialogRef}>
        <div className="dialog-header">
          <div>To verify deletion, enter &quot;{idValue}&quot;.</div>
          <div className="close-button" onClick={toggleDialog}>
            X
          </div>
        </div>
        <div className="dialog-body">
          <input
            name="verificationString"
            value={verificationString}
            onChange={handleChange}
            autoComplete={'off'}
            className={`${verified ? 'verified' : ''}`}
            ref={verificationRef}
            onKeyDown={handleVerificationDialogKeypress}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteDocInput;
