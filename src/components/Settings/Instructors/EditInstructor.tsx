import React, { useState, SetStateAction, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDB from '../../../useDB';
import useFormValidation from '../../../utils/useFormValidation';
import validate from './validateInstructor';
import DeleteDocInput from '../../DeleteDocInput';
import useAuth from '../../Auth/useAuth';

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
  const history = useHistory();
  const { get, put, find } = useDB();
  const { signUp } = useAuth();
  const [loginError, setLoginError] = useState(null);

  const [isNew, setNew] = useState(true);
  const [locations, setLocations]: [
    TLocationList,
    React.Dispatch<SetStateAction<[]>>
  ] = useState([]);

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
    console.log('submit');
    // todo: handle roles
    const roles = ['instructor'];
    try {
      if (isNew) {
        const signupRes = await signUp(values.email, values.password, roles);
        console.log(signupRes);
      }
      if (!values._id) {
        values._id = `${INITIAL_STATE.type}:${values.uspaNumber}`;
      }
      await put(values);
      history.goBack();
    } catch (error) {
      console.error(error);
      if (error.name === 'conflict')
        error.message = `User ${values.email} already exists`;
      setLoginError(error.message);
    } finally {
    }
  }
  // async function submit() {
  //   if (!values._id) {
  //     values._id = `${INITIAL_STATE.type}:${values.uspaNumber}`;
  //   }
  //   await put(values);
  //   history.goBack();
  // }

  useEffect(() => {
    (async () => {
      const locations = await find({ selector: { type: 'location' } });
      setLocations(locations);
    })();

    if (params.uspaNumber === 'NEW') return;

    setNew(false);

    (async () => {
      const doc = await get(`${INITIAL_STATE.type}:${params.uspaNumber}`);
      setValues(doc);
    })();
  }, [params.uspaNumber, get, find, setValues]);

  return (
    <div>
      {isNew ? <h1>New Instructor</h1> : <h1>Edit {values.uspaNumber}</h1>}
      <form onSubmit={handleSubmit} className="clean">
        <div className="input-group">
          <label htmlFor="uspaNumber">USPA #</label>
          <div className="tooltip">
            <input
              type="number"
              name="uspaNumber"
              id="uspaNumber"
              value={values.uspaNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={'12345'}
              autoComplete={'off'}
              disabled={!isNew}
            />
            {errors.uspaNumber && (
              <span className="error">{errors.uspaNumber}</span>
            )}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <div className="tooltip">
            <input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
              placeholder={'Full Name'}
              autoComplete={'off'}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="tooltip">
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
              placeholder={'email@example.com'}
              autoComplete={'off'}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone</label>
          <div className="tooltip">
            <input
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
              placeholder={'123 456 7890'}
              autoComplete={'off'}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="currentLocation">Location</label>
          <div className="tooltip">
            <select
              id="currentLocation"
              name="currentLocation"
              value={values.currentLocation}
              onChange={handleChange}
            >
              <option value="">Current Location: None</option>
              {locations.map(location => (
                <option key={location.code} value={location.code}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="tooltip">
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
              autoComplete={'off'}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="passwordConfirm">Password</label>
          <div className="tooltip">
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              value={values.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
              autoComplete={'off'}
            />
            {errors.passwordConfirm && (
              <span className="error">{errors.passwordConfirm}</span>
            )}
          </div>
        </div>
        <div className="button-row">
          <button type="submit">Save</button>
          {!isNew ? (
            <DeleteDocInput
              setValues={setValues}
              idValue={values.uspaNumber}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </div>
      </form>
      {loginError && <span className="error-text">{loginError}</span>}
    </div>
  );
};

export default EditInstructor;
