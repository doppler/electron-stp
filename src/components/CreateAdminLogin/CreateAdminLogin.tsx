import "./CreateAdminLogin.css";
import React, { useState, useContext, useEffect } from "react";
import useFormValidation from "./useFormValidation";
import validateAdminLogin from "./validateAdminLogin";
import dbContext from "../dbContext";
import useAuth from "../Auth/useAuth";

const INITIAL_STATE = {
  email: "doppler@gmail.com",
  password: "",
  passwordConfirm: ""
};

export default () => {
  const db = useContext(dbContext);

  const { logIn, signUp } = useAuth();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors
    // isSubitting
  } = useFormValidation(INITIAL_STATE, validateAdminLogin, authenticateUser);

  // if no db docs exist, it's not a login.
  // otherwise, it is.
  // the _users db contains 1 doc (_design/_auth) by default
  const [isLogin, setLogin] = useState(true);

  useEffect(() => {
    const info = async () => {
      try {
        const result = await db.info();
        if (result.doc_count === 1) setLogin(false);
      } catch (error) {
        console.error(error);
      }
    };
    info();
  }, [db]);

  async function authenticateUser() {
    const { email, password } = values;
    isLogin ? logIn(email, password) : signUp(email, password);
  }

  return (
    <div className="CreateAdminLogin">
      <p>isLogin: {isLogin.toString()}</p>
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
