declare module 'pouchdb-auth';

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
