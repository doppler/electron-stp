declare module 'pouchdb-auth';

type TLocation = {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  type: 'location';
  name: string;
  code: string;
};
type TLocations = Array<TLocation>;
type TEditLocationParams = {
  code?: string;
};
type TLocationErrors = {
  name?: string;
  code?: string;
};
type TAircraft = {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  type: 'aircraft';
  tailNumber: string;
  model: string;
  currentLocation?: string;
};
type TAircraftList = Array<TAircraft>;
type TEditAircraftParams = {
  tailNumber?: string;
};
type TAircraftErrors = {
  tailNumber?: string;
  model?: string;
};
type TLoginFormValues = {
  email: string;
  password: string;
  passwordConfirm?: string;
};
type TLoginFormErrors = {
  email?: string;
  password?: string;
  passwordConfirm?: string;
};
interface TFormValidationReturns {
  values: any;
  errors: any;
  handleChange?: (event: React.ChangeEvent) => void;
  handleBlur?: (event: React.FocusEvent) => void;
  handleSubmit?: (event: React.SyntheticEvent) => void;
  setValues: React.Dispatch<any>;
  isSubmitting?: Boolean;
}

type TIndexDefinition = {
  index: {
    fields: string[];
    ddoc: string;
    name: string;
  };
};

type TCreateIndexResults = object[];
