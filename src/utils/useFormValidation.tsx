import React, { useState, useEffect, useCallback } from 'react';

const useFormValidation = (
  initialState: any,
  validate: Function,
  authenticate: Function
): TFormValidationReturns => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState([]);
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

  const handleBlur = useCallback(
    (event: React.SyntheticEvent) => {
      const validation = validate(values);
      let element = event.target as HTMLInputElement;
      const valueHasChanged =
        values[element.name] !== initialState[element.name];
      if (valueHasChanged && element.name && validation.error?.details) {
        setErrors(
          validation.error.details.filter(
            (detail: TValidationError) => detail.context.key === element.name
          )
        );
      }
    },
    [initialState, values, validate]
  );

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    delete values.password;
    delete values.passwordConfirm;
    const validation = validate(values);
    console.log({ validation });
    if (validation.error) setErrors(validation.error.details);
    else setErrors([]);
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
