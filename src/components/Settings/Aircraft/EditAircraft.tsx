import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDB from '../../../useDB';
import useFormValidation from '../../useFormValidation';

const INITIAL_STATE: TAircraft = {
  type: 'aircraft',
  tailNumber: '',
  model: ''
};

const EditAircraft: React.FC = () => {
  const params: TEditAircraftParams = useParams();
  const history = useHistory();
  const { get, put } = useDB();

  const [isNew, setNew] = useState(true);

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
  } = useFormValidation(INITIAL_STATE, validate, submit);

  async function submit() {
    if (!values._id || !values.type) {
      values._id = `aircraft:${values.tailNumber}`;
    }
    await put(values);
    history.goBack();
  }

  useEffect(() => {
    if (params.tailNumber === 'NEW') return;

    setNew(false);

    (async () => {
      const doc = await get(`aircraft:${params.tailNumber}`);
      console.log(doc);
      setValues(doc);
    })();
  }, [params.tailNumber, get, setValues]);

  return (
    <div className="EditAircraft">
      <span>isNew: {JSON.stringify(isNew)}</span>
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
            // disabled={!isNew}
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditAircraft;
