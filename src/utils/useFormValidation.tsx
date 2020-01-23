import React, { useState, useEffect } from 'react';

const useFormValidation = (
  initialState: any,
  validate: Function,
  authenticate: Function
): TFormValidationReturns => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        authenticate();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors, isSubmitting, authenticate]);

  const handleChange = (event: React.ChangeEvent<any>) => {
    event.persist();
    setValues((prevValues: TLoginFormValues) => {
      return {
        ...prevValues,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      };
    });
  };

  const handleBlur = (event: React.FormEvent) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    console.log('handleSubmit');
    const validationErrors = validate(values);
    console.log(validationErrors);
    setErrors(validationErrors);
    setSubmitting(true);
  };

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    values,
    errors,
    isSubmitting
  };
};

export default useFormValidation;
