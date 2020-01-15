export type LoginFormValues = {
  email: string;
  password: string;
  passwordConfirm?: string;
};

export type LoginFormErrors = {
  email?: string;
  password?: string;
  passwordConfirm?: string;
};

export interface FormValidationReturns {
  values: any;
  errors: any;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  isSubmitting?: Boolean;
}
