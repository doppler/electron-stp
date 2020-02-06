import React from 'react';
import { ErrorList } from './FormComponents';

const ErrorDetails = (props: any) => {
  const { errors } = props;

  if (!errors.length) return null;

  return (
    <div>
      <ErrorList>
        {errors.map((error: TValidationError) => (
          <li key={`${error.context.key}:${error.type}`}>{error.message}</li>
        ))}
      </ErrorList>
      {/* <code>{JSON.stringify(errors, null, 2)}</code> */}
    </div>
  );
};

export default ErrorDetails;
