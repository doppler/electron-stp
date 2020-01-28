import React from 'react';

const ErrorDetails = (props: any) => {
  const { errors } = props;

  return (
    <ul>
      {errors.map((error: TValidationError) => (
        <li key={error.context.key}>{error.message}</li>
      ))}
    </ul>
  );
};

export default ErrorDetails;
