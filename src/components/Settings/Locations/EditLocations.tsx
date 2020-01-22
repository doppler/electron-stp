import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useFormValidation from '../../../utils/useFormValidation';
import validate from './validateLocation';
import useDB from '../../../useDB';
import DeleteDocInput from '../../DeleteDocInput';

const INITIAL_STATE: ILocation = {
  type: 'location',
  code: '',
  name: ''
};

const EditLocation = () => {
  const params: TEditLocationParams = useParams();
  const history = useHistory();
  const { get, put } = useDB();

  const [isNew, setNew] = useState(true);

  const {
    values,
    errors,
    setValues,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormValidation(INITIAL_STATE, validate, submit);

  async function submit() {
    if (!values._id) {
      values._id = `${INITIAL_STATE.type}:${values.code}`;
    }
    await put(values);
    history.goBack();
  }

  useEffect(() => {
    if (params.code === 'NEW') return;

    setNew(false);

    (async () => {
      const doc = await get(`location:${params.code}`);
      setValues(doc);
    })();
  }, [params.code, get, setValues]);

  return (
    <div className="EditLocation">
      <h1>Edit {values.code}</h1>
      <form onSubmit={handleSubmit} className="clean">
        <div className="tooltip">
          <input
            name="code"
            value={values.code}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="CODE"
            autoComplete="off"
            disabled={!isNew}
          />
          {errors.code && <span className="error">{errors.code}</span>}
        </div>
        <div className="tooltip">
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Location Name"
            autoComplete="off"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="button-row">
          <button type="submit">Save</button>
          <DeleteDocInput setValues={setValues} idValue={values.code} />
        </div>
      </form>
    </div>
  );
};

export default EditLocation;
