import React, { useState, useEffect } from "react";
import { LoginFormValues } from "./types";
import { FormValidationReturns } from "./types.d";

const useFormValidation = (
  initialState: any,
  validate: Function,
  authenticate: Function
): FormValidationReturns => {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((prevValues: LoginFormValues) => {
      return {
        ...prevValues,
        [event.target.name]: event.target.value
      };
    });
  };

  const handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  };

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting
  };
};

export default useFormValidation;