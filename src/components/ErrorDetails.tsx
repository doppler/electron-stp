import React from 'react';

const ErrorDetails = (props: any) => {
  const { errors } = props;

  if (!errors.length) return null;

  return (
    <ul className='errors'>
      {errors.map((error: TValidationError) => (
        <li key={error.context.key}>{error.message}</li>
      ))}
    </ul>
  );
};

export default ErrorDetails;
