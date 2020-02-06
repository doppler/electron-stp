import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useFormValidation from '../../../utils/useFormValidation';
import validate from './validateLocation';
import useDB from '../../../useDB';
import DeleteDocInput from '../../DeleteDocInput';
import ErrorDetails from '../../ErrorDetails';
import {
  Field,
  Form,
  Input,
  Button,
  ButtonGroup,
  Label,
  Panel
} from '../../FormComponents';
import { invalidIfHasErrorFor } from '../../../utils';

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
    <Panel>
      <h1>
        Edit {isNew ? 'New' : ''} Location {values.code}
      </h1>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor='code'>Code</Label>
          <Input
            name='code'
            value={values.code}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='CODE'
            autoComplete='off'
            className={invalidIfHasErrorFor(errors, 'code')}
            disabled={!isNew}
          />
        </Field>
        <Field>
          <Label htmlFor='dzname'>DZ Name</Label>
          <Input
            name='dzname'
            value={values.dzname}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='DZ Name'
            autoComplete='off'
            className={invalidIfHasErrorFor(errors, 'dzname')}
          />
        </Field>
        <ButtonGroup>
          <Button type='submit'>Save</Button>
          {!isNew ? (
            <DeleteDocInput
              setValues={setValues}
              idValue={values.code}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </ButtonGroup>
      </Form>
      <ErrorDetails errors={errors} />
    </Panel>
  );
};

export default EditLocation;
