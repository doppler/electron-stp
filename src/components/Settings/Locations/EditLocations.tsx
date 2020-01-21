import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useFormValidation from '../../useFormValidation';
import useDB from '../../../useDB';

const INITIAL_STATE: TLocation = {
  code: '',
  name: ''
};

const validate = (values: TLocation) => {
  let errors: TLocationErrors = {};
  if (values.code && !values.code.match(/[A-Z]{3}/)) {
    errors.code = 'Code must be at least 3 characters and UPPERCASE';
  }
  if (values.name && values.name.length < 2) {
    errors.name = 'Really? One character? No.';
  }
  return errors;
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
    if (!values._id || !values.type) {
      values._id = `location:${values.code}`;
      values.type = 'location';
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditLocation;
