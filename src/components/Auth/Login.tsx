import './Login.css';
import React, { useState } from 'react';
import useAuth from '../Auth/useAuth';
import { useHistory } from 'react-router-dom';
import useFormValidation from '../../utils/useFormValidation';
import validateLogin from './validateLogin';

const INITIAL_STATE: TLoginFormValues = {
  email: process.env.REACT_APP_TEST_EMAIL || '',
  password: process.env.REACT_APP_TEST_PASSWORD || '',
  passwordConfirm: process.env.REACT_APP_TEST_PASSWORD || ''
};

const Login = () => {
  const history = useHistory();
  const { logIn } = useAuth();

  const [loginError, setLoginError] = useState(null);

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
    validateLogin,
    authenticateUser
  );

  async function authenticateUser() {
    const { email, password }: TLoginFormValues = values;
    try {
      await logIn(email, password);
      history.push('/');
    } catch (error) {
      console.error(error);
      setLoginError(error.message);
    }
  }

  return (
    <div className="CreateAdminLogin">
      <form onSubmit={handleSubmit} className="clean login">
        <p>Instructor Login</p>
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
        <button type="submit">Login</button>
        {loginError && <span className="error-text">{loginError}</span>}
      </form>
    </div>
  );
};

export default Login;