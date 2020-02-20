import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';
import useDB from '../../../useDB';
import useFormValidation from '../../../utils/useFormValidation';
import validate from './validateInstructor';
import DeleteDocInput from '../../DeleteDocInput';
import useAuth from '../../Auth/useAuth';
import ErrorDetails from '../../ErrorDetails';
import {
  Form,
  Field,
  Label,
  Button,
  ButtonGroup,
  Input,
  Select,
  Panel
} from '../../FormComponents';
import { invalidIfHasErrorFor } from '../../../utils';
import { isFirstRun, setFirstRun } from '../../../utils/firstRun';

const INITIAL_STATE: IInstructor = {
  type: 'instructor',
  name: '',
  email: '',
  phone: '',
  uspaNumber: '',
  password: '',
  passwordConfirm: ''
};

const EditInstructor: React.FC = () => {
  const params: TEditInstructorParams = useParams();
  const match = useRouteMatch();
  const history = useHistory();
  const { get, put, find } = useDB();
  const { signUp, logIn, user } = useAuth();
  const [isLogin, setLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const isNew = params.uspaNumber === 'NEW' || match.path === '/login';

  const [locations, setLocations] = useState<any>([]);

  useEffect(() => {
    setLogin(!isFirstRun && !user);
  }, [user]);

  const {
    values,
    errors,
    setValues,
    handleBlur,
    handleChange,
    handleSubmit
  }: TInstructorValidationReturns = useFormValidation(
    INITIAL_STATE,
    validate,
    submit
  );

  async function submit() {
    // todo: handle roles
    const roles = ['instructor'];
    try {
      if (isLogin) {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const loginRes = await logIn(values.email, values.password);
        history.push('/');
      } else if (isNew) {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const signupRes = await signUp(
          values.email,
          values.password,
          roles,
          !user ? true : false
        );
        setFirstRun();
        values._id = `${INITIAL_STATE.type}:${values.uspaNumber}`;
        delete values.password;
        delete values.passwordConfirm;
        await put(values);
        history.push('/settings');
      } else {
        await put(values);
        history.push('/settings');
      }
    } catch (error) {
      console.error(error);
      if (error.name === 'conflict')
        error.message = `User ${values.email} already exists`;
      setLoginError(error.message);
    }
  }

  useEffect(() => {
    (async () => {
      const locations = await find({ selector: { type: 'location' } });
      setLocations(locations);
    })();

    /* If the route is /login and there are no users in the _users db,
     * we need to create an admin user with this instructor, so we
     * won't be needing to fetch them from the db.
     */
    if (isNew) return;

    (async () => {
      const doc = await get(`${INITIAL_STATE.type}:${params.uspaNumber}`);
      setValues(doc);
    })();
  }, [params.uspaNumber, get, find, setValues, match, isNew]);

  return (
    <Panel>
      <h1>{isNew ? 'New Instructor' : `Edit ${values.uspaNumber}`}</h1>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor='uspaNumber'>USPA #</Label>
          <Input
            type='number'
            name='uspaNumber'
            id='uspaNumber'
            value={values.uspaNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={'12345'}
            autoComplete={'off'}
            disabled={!isNew}
            className={invalidIfHasErrorFor(errors, 'uspaNumber')}
          />
        </Field>
        <Field>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            name='name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            placeholder={'Full Name'}
            autoComplete={'off'}
            className={invalidIfHasErrorFor(errors, 'name')}
          />
        </Field>
        <Field>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            placeholder={'email@example.com'}
            autoComplete={'off'}
            className={invalidIfHasErrorFor(errors, 'email')}
          />
        </Field>
        <Field>
          <Label htmlFor='phone'>Phone</Label>
          <Input
            id='phone'
            name='phone'
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            placeholder={'123 456 7890'}
            autoComplete={'off'}
            className={invalidIfHasErrorFor(errors, 'phone')}
          />
        </Field>
        <Field>
          <Label htmlFor='currentLocation'>Location</Label>
          <Select
            id='currentLocation'
            name='currentLocation'
            value={values.currentLocation}
            onChange={handleChange}
          >
            <option value=''>Current Location: None</option>
            {locations.map((location: ILocation) => (
              <option key={location.code} value={location.code}>
                {location.dzname}
              </option>
            ))}
          </Select>
        </Field>
        {isNew && (
          <>
            <Field>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onSubmit={handleSubmit}
                autoComplete={'off'}
                className={invalidIfHasErrorFor(errors, 'password')}
              />
            </Field>
            <Field>
              <Label htmlFor='passwordConfirm'>Password</Label>
              <Input
                id='passwordConfirm'
                name='passwordConfirm'
                type='password'
                value={values.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                onSubmit={handleSubmit}
                autoComplete={'off'}
                className={invalidIfHasErrorFor(errors, 'passwordConfirm')}
              />
            </Field>
          </>
        )}
        <ButtonGroup>
          <Button type='submit'>Save</Button>
          {!isNew && !(user.name === values.email) ? (
            <DeleteDocInput
              setValues={setValues}
              idValue={values.uspaNumber}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </ButtonGroup>
      </Form>
      {loginError && <span className='error-text'>{loginError}</span>}
      <ErrorDetails errors={errors} />
    </Panel>
  );
};

export default EditInstructor;
