import React, { useState, SetStateAction, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDB from '../../../useDB';
import useFormValidation from '../../../utils/useFormValidation';
import DeleteDocInput from '../../DeleteDocInput';

const INITIAL_STATE: TInstructor = {
  type: 'instructor',
  name: '',
  email: '',
  phone: '',
  uspaNumber: ''
};

const EditInstructor: React.FC = () => {
  const params: TEditInstructorParams = useParams();
  const history = useHistory();
  const { get, put, find } = useDB();

  const [isNew, setNew] = useState(true);
  const [locations, setLocations]: [
    TLocations,
    React.Dispatch<SetStateAction<[]>>
  ] = useState([]);

  const validate: ValidateInstructorFunction = values => {
    const errors: TInstructorErrors = {};
    return errors;
  };

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
    if (!values._id || !values.type) {
      values._id = `${INITIAL_STATE.type}:${values.uspaNumber}`;
    }
    await put(values);
    history.goBack();
  }

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
      <h1>Edit {values.uspaNumber}</h1>
      <form onSubmit={handleSubmit} className="clean">
        <div className="tooltip">
          <input
            name="uspaNumber"
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
        <div className="tooltip">
          <input
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
        <div className="tooltip">
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            placeholder={'email@example.com'}
            autoComplete={'off'}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="tooltip">
          <input
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
        <div className="tooltip">
          <select
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
        <div className="button-row">
          <button type="submit">Save</button>
          {!isNew ? (
            <DeleteDocInput setValues={setValues} idValue={values.uspaNumber} />
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default EditInstructor;
