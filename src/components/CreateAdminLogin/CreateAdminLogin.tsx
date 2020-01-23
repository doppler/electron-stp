import './CreateAdminLogin.css';
import React, { useState, useEffect } from 'react';
import useFormValidation from '../../utils/useFormValidation';
import validateAdminLogin from './validateAdminLogin';
import useAuth from '../Auth/useAuth';
import { useHistory } from 'react-router-dom';

const INITIAL_STATE: TLoginFormValues = {
  email: process.env.REACT_APP_TEST_EMAIL || '',
  password: process.env.REACT_APP_TEST_PASSWORD || '',
  passwordConfirm: process.env.REACT_APP_TEST_PASSWORD || ''
};

export default () => {
  const history = useHistory();
  const { userDocCount, logIn, signUp } = useAuth();

  // if there are no user docs, we'll show a passwordConfirm field and create the first user.
  // otherwise, we'll attempt a log in.
  const [isLogin, setLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    setLogin(userDocCount > 0);
  }, [userDocCount]);

  interface CreateLoginFormValidationReturns extends TFormValidationReturns {
    values: TLoginFormValues;
    errors: TLoginFormErrors;
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
    const { email, password }: TLoginFormValues = values;
    try {
      isLogin
        ? await logIn(email, password)
        : await signUp(email, password, []);
      history.push('/');
    } catch (error) {
      console.error(error);
      setLoginError(error.message);
    }
  }

  return (
    <div className="CreateAdminLogin">
      <form onSubmit={handleSubmit} className="clean login">
        {isLogin ? <p>Instructor login</p> : <p>Add instructor account</p>}
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          required
          placeholder="Email Address"
          className={errors.email ? 'invalid' : ''}
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
          className={errors.password ? 'invalid' : ''}
        />
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}
        {!isLogin ? (
          <input
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            placeholder="Confirm Password"
            className={errors.passwordConfirm ? 'invalid' : ''}
          />
        ) : null}
        {errors.passwordConfirm && (
          <span className="error-text">{errors.passwordConfirm}</span>
        )}

        <button type="submit">{!isLogin ? 'Create ' : ''}Admin Login</button>
        {loginError && <span className="error-text">{loginError}</span>}
      </form>
    </div>
  );
};
