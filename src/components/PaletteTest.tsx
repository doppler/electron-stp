import React from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  FieldSet,
  Field,
  Label,
  Input,
  Button,
  Text
} from './FormComponents';
const PaletteTest = () => {
  return (
    <div className='PaletteTest'>
      <div className='panel'>
        <div className='panel-header'>
          <h2 className='panel-title'>Palette Test</h2>
        </div>
        <div className='panel-body'>
          <Text>
            Eu est nostrud ea voluptate pariatur ut aliquip labore nostrud
            aliqua. Consequat consectetur labore ullamco eiusmod culpa occaecat.
            Cillum irure eiusmod voluptate cillum ex occaecat nostrud incididunt
            velit dolore labore occaecat. Mollit culpa non enim voluptate qui
            cillum aliqua qui qui.
          </Text>
          <Text success>This is success</Text>
          <Text>
            <Link to={'#'}>This is a link</Link>
          </Text>
          <Text warning>This is a warning.</Text>
          <Text error>This is an error.</Text>
        </div>
      </div>
      <div>
        <Form>
          <FieldSet>
            <Field>
              <Label>Name</Label>
              <Input id='name' name='name' placeholder='Name' />
            </Field>
            <Field>
              <Label>Invalid</Label>
              <Input
                id='invalid'
                name='invalid'
                placeholder='Invalid'
                className='invalid'
              />
            </Field>
          </FieldSet>
          <Button>Save</Button>
          <Button className='warning'>Cancel</Button>
        </Form>
      </div>
    </div>
  );
};

export default PaletteTest;
