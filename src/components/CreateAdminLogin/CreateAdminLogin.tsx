import "./CreateAdminLogin.css";
import React, { useState, useEffect } from "react";
import useFormValidation from "../useFormValidation";
import validateAdminLogin from "./validateAdminLogin";
import useAuth from "../Auth/useAuth";
import {
  FormValidationReturns,
  LoginFormValues,
  LoginFormErrors
} from "../types";

const INITIAL_STATE: LoginFormValues = {
  email: process.env.REACT_APP_TEST_EMAIL || "",
  password: process.env.REACT_APP_TEST_PASSWORD || "",
  passwordConfirm: process.env.REACT_APP_TEST_PASSWORD || ""
};

export default () => {
  const { userDocCount, logIn, signUp } = useAuth();

  // if there are no user docs, we'll show a passwordConfirm field and create the first user.
  // otherwise, we'll attempt a log in.
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    setLogin(userDocCount > 0);
  }, [userDocCount]);

  interface CreateLoginFormValidationReturns extends FormValidationReturns {
    values: LoginFormValues;
    errors: LoginFormErrors;
  }

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  }: CreateLoginFormValidationReturns = useFormValidation(
    INITIAL_STATE,
    validateAdminLogin,
    authenticateUser
  );

  async function authenticateUser() {
    const { email, password }: LoginFormValues = values;
    isLogin ? logIn(email, password) : signUp(email, password);
  }

  return (
    <div className="CreateAdminLogin">
      {isLogin ? <p>Instructor login</p> : <p>Add instructor account</p>}
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        required
        placeholder="Email Address"
        className={errors.email ? "invalid" : ""}
      />
      {errors.email && <span className="error-text">{errors.email}</span>}
      <input
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        required
        placeholder="Password"
        className={errors.password ? "invalid" : ""}
      />
      {errors.password && <span className="error-text">{errors.password}</span>}
      {!isLogin ? (
        <input
          name="passwordConfirm"
          value={values.passwordConfirm}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          placeholder="Confirm Password"
          className={errors.passwordConfirm ? "invalid" : ""}
        />
      ) : null}
      {errors.passwordConfirm && (
        <span className="error-text">{errors.passwordConfirm}</span>
      )}

      <button onClick={handleSubmit}>
        {!isLogin ? "Create " : ""}Admin Login
      </button>
    </div>
  );
};
