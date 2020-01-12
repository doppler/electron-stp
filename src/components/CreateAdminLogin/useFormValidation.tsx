import React, { useState, useEffect } from "react";
import { FormValues, FormErrors } from "./types";

const useFormValidation = (
  initialState: FormValues,
  validate: Function,
  authenticate: Function
) => {
  const [values, setValues]: [FormValues, Function] = useState(initialState);
  const [errors, setErrors]: [FormErrors, Function] = useState({});
  const [isSubitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        authenticate();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors, isSubitting, authenticate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((prevValues: FormValues) => {
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
    console.log("handleSubmit");
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
    isSubitting
  };
};

export default useFormValidation;
