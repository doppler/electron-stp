import React, { useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import useDB from '../../useDB';
import validate from './validateJump';
import useFormValidation from '../../utils/useFormValidation';
import { invalidIfHasErrorFor } from '../../utils';
import {
  Panel,
  Form,
  Field,
  Input,
  Label,
  Button,
  ButtonGroup
} from '../FormComponents';
import ErrorDetails from '../ErrorDetails';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';

const INITIAL_STATE: IJump = {
  type: 'jump',
  jumpNumber: 3,
  diveFlow: 1,
  date: new Date().toISOString(),
  location: '',
  instructor: '',
  aircraft: '',
  exitAltitude: 14000,
  deploymentAltitude: 5500,
  recommendedNextDF: undefined,
  exit: '',
  freefall: '',
  canopy: '',
  landing: ''
};

const EditJump: React.FC = () => {
  console.log('EditJump');
  const { get, put } = useDB();
  const params = useParams<{ studentId: string; jumpNumber: string }>();
  const history = useHistory();
  const location = useLocation();

  const {
    values,
    errors,
    setValues,
    handleBlur,
    handleChange,
    handleSubmit
  }: TJumpValidationReturns = useFormValidation(
    INITIAL_STATE,
    validate,
    submit
  );

  async function submit() {
    if (!values._id) {
      values._id = `${params.studentId}:jump:${values.jumpNumber}`;
    }
    await put(values);
    console.info('Saved Jump');
    console.info({ values });
    history.push(`/student/${params.studentId}/jump/${values.jumpNumber}`);
  }

  // http://localhost:3000/student/student:foo@bar.com/jump/5

  useEffect(() => {
    console.log('rendering');
    if (params.jumpNumber !== 'NEW') {
      console.log(`fetching ${params.jumpNumber}`);

      (async () => {
        const doc = await get(`${params.studentId}:jump:${params.jumpNumber}`);
        setValues(doc);
      })();
    }
  }, [get, params, setValues, values.jumpNumber]);

  return (
    <Panel>
      <h1>
        Edit {!values._id ? 'New' : ''} Jump {values.jumpNumber}
      </h1>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor='jumpNumber'>Jump #</Label>
          <Input
            name='jumpNumber'
            type='number'
            value={values.jumpNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={invalidIfHasErrorFor(errors, 'jumpNumber')}
          />
        </Field>
        <Field>
          <Label htmlFor='diveFlow'>DF #</Label>
          <Input
            name='diveFlow'
            type='number'
            value={values.diveFlow}
            onChange={handleChange}
            onBlur={handleBlur}
            className={invalidIfHasErrorFor(errors, 'diveFlow')}
          />
        </Field>
        <Field>
          <Label htmlFor='date'>Date</Label>
          <Input
            name='date'
            value={format(parseISO(values.date), 'iii LLL do yyyy')}
            onChange={handleChange}
            onBlur={handleBlur}
            className={invalidIfHasErrorFor(errors, 'date')}
          />
        </Field>
        <Field>
          <Label htmlFor='location'>Location</Label>
          <Input
            name='location'
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            className={invalidIfHasErrorFor(errors, 'location')}
          />
        </Field>
        <Field>
          <Label htmlFor='instructor'>Instructor</Label>
          <Input
            name='instructor'
            value={values.instructor}
            onChange={handleChange}
            onBlur={handleBlur}
            className={invalidIfHasErrorFor(errors, 'instructor')}
          />
        </Field>
        <Field>
          <Label htmlFor='aircraft'>Aircraft</Label>
          <Input
            name='aircraft'
            value={values.aircraft}
            onChange={handleChange}
            onBlur={handleBlur}
            className={invalidIfHasErrorFor(errors, 'aircraft')}
          />
        </Field>
        <Field>
          <Label htmlFor='exitAltitude'>Exit Alt.</Label>
          <Input
            name='exitAltitude'
            type='number'
            value={values.exitAltitude}
            onChange={handleChange}
            onBlur={handleBlur}
            className={invalidIfHasErrorFor(errors, 'exitAltitude')}
          />
        </Field>
        <Field>
          <Label htmlFor='deploymentAltitude'>Pull Alt.</Label>
          <Input
            name='deploymentAltitude'
            type='number'
            value={values.deploymentAltitude}
            onChange={handleChange}
            onBlur={handleBlur}
            className={invalidIfHasErrorFor(errors, 'deploymentAltitude')}
          />
        </Field>
        <ButtonGroup>
          <Button type='submit'>Save</Button>
        </ButtonGroup>
        <ErrorDetails errors={errors} />
      </Form>
      <code>{JSON.stringify(location, null, 2)}</code>
      <code>{JSON.stringify(values, null, 2)}</code>
    </Panel>
  );
};

export default EditJump;
