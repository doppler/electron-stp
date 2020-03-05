import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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

const INITIAL_STATE: IJump = {
  type: 'jump',
  jumpNumber: 3,
  diveFlow: 1,
  date: format(new Date(), 'yyyy-MM-dd'),
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

// TODO: change date back to a datetime so it'll sort naturally in the DB

const EditJump: React.FC = () => {
  const { put, allDocs } = useDB();
  const params = useParams<{ studentId: string; jumpNumber: string }>();
  const history = useHistory();
  const [student, setStudent] = useState<IStudent | null>(null);
  const [jumps, setJumps] = useState<IJump[] | []>([]);
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
    // store parts of this jump's values on student.latestJump
    const { jumpNumber, diveFlow, date, location, instructor } =
      params.jumpNumber === 'NEW' ? values : jumps[jumps.length - 1];
    const studentWithLatestJump = {
      ...student,
      latestJump: { jumpNumber, diveFlow, date, location, instructor }
    };
    await put(studentWithLatestJump);

    history.replace(`/student/${params.studentId}/jump/${values.jumpNumber}`);
  }

  useEffect(() => {
    (async () => {
      const docs = await allDocs({
        startkey: params.studentId,
        endkey: `${params.studentId}:jump:999`,
        include_docs: true,
        descending: false
      });
      const [student, ...jumps] = docs;
      setStudent(student);
      setJumps(jumps);
      if (params.jumpNumber === 'NEW' && jumps.length) {
        // increment jumpNumber and diveFlow from previous jump
        const jump = jumps[jumps.length - 1];
        setValues((prevState: IJump) => ({
          ...prevState,
          jumpNumber: jump.jumpNumber + 1,
          diveFlow: jump.diveFlow + 1
        }));
      } else if (params.jumpNumber !== 'NEW' && jumps.length) {
        // loading an existing jump from jump list
        const jump = jumps.find(
          (jump: IJump) => jump.jumpNumber === Number(params.jumpNumber)
        );
        setValues(jump);
      } else {
        // set jumpNumber based on student.previousJumpNumber
        setValues((prevState: IJump) => ({
          ...prevState,
          jumpNumber: student.previousJumpNumber + 1
        }));
      }
    })();
  }, [allDocs, params.studentId, params.jumpNumber, setValues]);

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
            type='date'
            value={values.date}
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
    </Panel>
  );
};

export default EditJump;
