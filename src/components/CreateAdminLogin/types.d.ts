export type FormValues = {
  email: string;
  password: string;
  passwordConfirm?: string;
};

export type FormErrors = {
  email?: string;
  password?: string;
  passwordConfirm?: string;
};
