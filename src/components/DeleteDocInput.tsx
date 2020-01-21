import React, { useState, useEffect, useRef, SyntheticEvent } from 'react';
import './DeleteDocInput.css';

const DeleteDocInput = (props: any) => {
  const { setValues, idValue } = props;

  const dialogRef = useRef<HTMLDivElement>(document.createElement('div'));

  const [verificationString, setVerificationString] = useState('');

  const handleChange = (event: any) => {
    setVerificationString(event.currentTarget.value);
  };

  useEffect(() => {
    setValues((prevValues: any) => ({
      ...prevValues,
      _deleted: verificationString === idValue
    }));
  }, [verificationString, idValue, setValues]);

  const openDialog = (event: SyntheticEvent) => {
    event.preventDefault();
    dialogRef.current.classList.toggle('hidden');
  };

  return (
    <div className="DeleteDocInput">
      <button className="warning" onClick={openDialog}>
        Delete
      </button>
      <div id="foo" className={`dialog hidden`} ref={dialogRef}>
        <span>To verify deletion, enter &quot;{idValue}&quot;.</span>
        <input
          name="verificationString"
          value={verificationString}
          onChange={handleChange}
          autoComplete={'off'}
          className="warning"
        />
      </div>
    </div>
  );
};

export default DeleteDocInput;
