import React, { useState, useEffect, SetStateAction } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDB from '../../../useDB';
import useFormValidation from '../../../utils/useFormValidation';
import DeleteDocInput from '../../DeleteDocInput';

const INITIAL_STATE: TAircraft = {
  _deleted: false,
  type: 'aircraft',
  tailNumber: '',
  model: '',
  currentLocation: ''
};

const EditAircraft: React.FC = () => {
  const params: TEditAircraftParams = useParams();
  const history = useHistory();
  const { get, put, find } = useDB();

  const [isNew, setNew] = useState(true);
  const [locations, setLocations]: [
    TLocations,
    React.Dispatch<SetStateAction<[]>>
  ] = useState([]);

  const validate = (values: TAircraft) => {
    let errors: TAircraftErrors = {};
    return errors;
  };

  const {
    values,
    errors,
    setValues,
    handleBlur,
    handleChange,
    handleSubmit
  }: TAircraftValidationReturns = useFormValidation(
    INITIAL_STATE,
    validate,
    submit
  );

  async function submit() {
    if (!values._id || !values.type) {
      values._id = `aircraft:${values.tailNumber}`;
    }
    await put(values);
    history.goBack();
  }

  useEffect(() => {
    (async () => {
      const locations = await find({ selector: { type: 'location' } });
      setLocations(locations);
    })();

    if (params.tailNumber === 'NEW') return;

    setNew(false);

    (async () => {
      const doc = await get(`aircraft:${params.tailNumber}`);
      // to keep React from bitching about changing from uncontrolled
      // form into controlled form:
      doc._deleted = false;
      setValues(doc);
    })();
  }, [params.tailNumber, get, find, setValues]);

  return (
    <div className="EditAircraft">
      <h1>Edit {values.tailNumber}</h1>
      <form onSubmit={handleSubmit} className="clean">
        <div className="tooltip">
          <input
            name="tailNumber"
            value={values.tailNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={'NTAILN0'}
            autoComplete={'off'}
            disabled={!isNew}
          />
          {errors.tailNumber && (
            <span className="error">{errors.tailNumber}</span>
          )}
        </div>
        <div className="tooltip">
          <input
            name="model"
            value={values.model}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={'Model'}
            autoComplete={'off'}
            // disabled={!isNew}
          />
          {errors.model && <span className="error">{errors.model}</span>}
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
          <DeleteDocInput setValues={setValues} idValue={values.tailNumber} />
        </div>
      </form>
    </div>
  );
};

export default EditAircraft;
