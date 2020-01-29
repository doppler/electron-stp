import React from 'react';

const ErrorDetails = (props: any) => {
  const { errors } = props;

  if (!errors.length) return null;

  return (
    <div>
      <ul className='errors'>
        {errors.map((error: TValidationError) => (
          <li key={error.context.key}>{error.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorDetails;
