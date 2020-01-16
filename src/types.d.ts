declare module "pouchdb-auth";

type TLocation = {
  _id?: string;
  _rev?: string;
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
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  setValues: React.Dispatch<any>;
  isSubmitting?: Boolean;
}
