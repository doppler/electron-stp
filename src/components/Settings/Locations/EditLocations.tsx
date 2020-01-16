import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFormValidation from "../../useFormValidation";

const INITIAL_STATE: TLocation = {
  name: "",
  code: ""
};

const validate = (values: TLocation) => {
  let errors: TLocationErrors = {};
  if (!values.code.match(/[A-Z]{3}/)) {
    errors.code = "Code must be at least 3 characters and UPPERCASE";
  }
  return errors;
};

const authenticate = () => console.log("authenticate");

const EditLocation = () => {
  const params: TEditLocationParams = useParams();
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormValidation(INITIAL_STATE, validate, authenticate);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    if (params.code === "NEW") return;
  }, [params.code]);

  return (
    <div className="EditLocation">
      <h1>Edit {values.code}</h1>
      <form className="clean">
        <div>
          <input
            name="code"
            value={values.code}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="CODE"
            autoComplete="off"
          />
        </div>
        {errors.code && <span className="error-text">{errors.code}</span>}
        <div>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Location Name"
            autoComplete="off"
          />
        </div>
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
};

export default EditLocation;
