import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDB from '../../../useDB';
import useFormValidation from '../../../utils/useFormValidation';
import validate from './validateAircraft';
import DeleteDocInput from '../../DeleteDocInput';
import ErrorDetails from '../../ErrorDetails';

const INITIAL_STATE: IAircraft = {
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
  const [locations, setLocations] = useState<any>([]);

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
    if (!values._id) {
      values._id = `${INITIAL_STATE.type}:${values.tailNumber}`;
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
      setValues(doc);
    })();
  }, [params.tailNumber, get, find, setValues]);

  const hasErrors = (fieldName: string): boolean =>
    errors.map(error => error.context.key).includes(fieldName);

  return (
    <div className='EditAircraft'>
      <h1>Edit {values.tailNumber}</h1>
      <form onSubmit={handleSubmit} className='clean'>
        <div className='tooltip'>
          <input
            name='tailNumber'
            value={values.tailNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={'NTAILN0'}
            autoComplete={'off'}
            className={hasErrors('tailNumber') ? 'invalid' : ''}
            disabled={!isNew}
          />
        </div>
        <div className='tooltip'>
          <input
            name='model'
            value={values.model}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={'Model'}
            autoComplete={'off'}
            className={hasErrors('model') ? 'invalid' : ''}
            disabled={!isNew}
          />
        </div>
        <div className='tooltip'>
          <select
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
          </select>
        </div>
        <div className='button-row'>
          <button type='submit'>Save</button>
          {!isNew ? (
            <DeleteDocInput
              setValues={setValues}
              idValue={values.tailNumber}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </div>
      </form>
      <ErrorDetails errors={errors} />
    </div>
  );
};

export default EditAircraft;
