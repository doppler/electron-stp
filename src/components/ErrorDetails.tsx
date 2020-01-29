import React from 'react';

const ErrorDetails = (props: any) => {
  const { errors } = props;

  if (!errors.length) return null;

  return (
    <div>
      <ul className='errors'>
        {errors.map((error: TValidationError) => (
          <li key={`${error.context.key}:${error.type}`}>{error.message}</li>
        ))}
      </ul>
      <code>{JSON.stringify(errors, null, 2)}</code>
    </div>
  );
};

export default ErrorDetails;
