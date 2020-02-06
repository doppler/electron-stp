import './Login.css';
import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../Auth/useAuth';
import { useHistory } from 'react-router-dom';
import useFormValidation from '../../utils/useFormValidation';
import validateLogin from './validateLogin';
import ErrorDetails from '../ErrorDetails';
import { Form, Field, Label, Input, Button, Panel } from '../FormComponents';
import styled from 'styled-components';

const INITIAL_STATE: TLoginFormValues = {
  email: process.env.REACT_APP_TEST_EMAIL || '',
  password: process.env.REACT_APP_TEST_PASSWORD || ''
};

const LoginPanel = styled(Panel)`
  width: 30em;
  margin-left: calc(50vw - 15em);
  margin-top: 1em;
`;

const Login = () => {
  const history = useHistory();
  const { logIn } = useAuth();

  const emailFieldRef = useRef<HTMLInputElement>(null);

  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    emailFieldRef.current && emailFieldRef.current.focus();
  }, [emailFieldRef.current]);

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
    <LoginPanel>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor='email'>Email</Label>
          <Input
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type='email'
            required
            placeholder='Email Address'
            className={errors.email ? 'invalid' : ''}
            ref={emailFieldRef}
          />
        </Field>
        <Field>
          <Label htmlFor='password'>Password</Label>
          <Input
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type='password'
            required
            placeholder='Password'
            className={errors.password ? 'invalid' : ''}
          />
        </Field>
        <Button type='submit'>Login</Button>
      </Form>
      {loginError && <span className='error-text'>{loginError}</span>}
      <ErrorDetails errors={errors} />
      {/* <code>{JSON.stringify(values, null, 2)}</code> */}
    </LoginPanel>
  );
};

export default Login;
