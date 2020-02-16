import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDB from '../../useDB';
import validate from './validateStudent';
import useFormValidation from '../../utils/useFormValidation';
import {
  Panel,
  Form,
  Label,
  Input,
  Field,
  ButtonGroup,
  Button
} from '../FormComponents';
import { invalidIfHasErrorFor } from '../../utils';
import ErrorDetails from '../ErrorDetails';

const INITIAL_STATE: IStudent = {
  type: 'student',
  name: '',
  email: '',
  phone: '',
  hometown: '',
  currentLocation: '',
  locations: []
};

const EditStudent: React.FC = () => {
  const params: TEditStudentParams = useParams();
  // const match = useRouteMatch();
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
  }: TStudentValidationReturns = useFormValidation(
    INITIAL_STATE,
    validate,
    submit
  );

  async function submit() {
    if (!values._id) {
      values._id = `${INITIAL_STATE.type}:${values.email}`;
    }
    await put(values);
    history.goBack();
  }

  useEffect(() => {
    console.info({ params });
    if (params.id === 'NEW') return;
    setNew(false);

    (async () => {
      const doc = await get(`student:${params.id}`);
      console.log({ doc });
      setValues(doc);
    })();
  }, [params.id, get, setValues]);

  return (
    <Panel>
      <h1>
        Edit {isNew ? 'New' : ''} Student {values.name}
      </h1>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor='name'>Name</Label>
          <Input
            name='name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={'Full Name'}
            autoComplete={'off'}
            className={invalidIfHasErrorFor(errors, 'name')}
          />
        </Field>
        <Field>
          <Label htmlFor='email'>Email</Label>
          <Input
            name='email'
            type='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={'email@address.com'}
            autoComplete={'off'}
            className={invalidIfHasErrorFor(errors, 'email')}
          />
        </Field>
        <Field>
          <Label htmlFor='phone'>Phone</Label>
          <Input
            name='phone'
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='123 456 7890'
            autoComplete={'off'}
            className={invalidIfHasErrorFor(errors, 'phone')}
          />
        </Field>
        <Field>
          <Label htmlFor='hometown'>Hometown</Label>
          <Input
            name='hometown'
            value={values.hometown}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Hometown, ST'
            autoComplete={'off'}
            className={invalidIfHasErrorFor(errors, 'hometown')}
          />
        </Field>
        <ButtonGroup>
          <Button type='submit'>Save</Button>
        </ButtonGroup>
      </Form>
      <ErrorDetails errors={errors} />
    </Panel>
  );
};

export default EditStudent;
