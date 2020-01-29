import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useFormValidation from '../../../utils/useFormValidation';
import validate from './validateLocation';
import useDB from '../../../useDB';
import DeleteDocInput from '../../DeleteDocInput';
import ErrorDetails from '../../ErrorDetails';

const INITIAL_STATE: ILocation = {
  type: 'location',
  code: '',
  dzname: ''
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
  }: TLocationValidationReturns = useFormValidation(
    INITIAL_STATE,
    validate,
    submit
  );

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

  const hasErrors = (fieldName: string): boolean =>
    errors.map(error => error.context.key).includes(fieldName);

  return (
    <div className='EditLocation'>
      <h1>Edit {values.code}</h1>
      <form onSubmit={handleSubmit} className='clean'>
        <div className='tooltip'>
          <input
            name='code'
            value={values.code}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='CODE'
            autoComplete='off'
            className={hasErrors('code') ? 'invalid' : ''}
            disabled={!isNew}
          />
        </div>
        <div className='tooltip'>
          <input
            name='dzname'
            value={values.dzname}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='DZ Name'
            autoComplete='off'
            className={hasErrors('dzname') ? 'invalid' : ''}
          />
        </div>
        <div className='button-row'>
          <button type='submit'>Save</button>
          {!isNew ? (
            <DeleteDocInput
              setValues={setValues}
              idValue={values.code}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </div>
      </form>
      <ErrorDetails errors={errors} />
    </div>
  );
};

export default EditLocation;
