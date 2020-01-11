import { FormValues, FormErrors } from "./types";

const validateAdminLogin = (values: FormValues, isSubmitting: Boolean) => {
  let errors: FormErrors = {};
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (values.password && values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (
    values.password &&
    !(
      values.password.match(/[A-Z]/) &&
      values.password.match(/[a-z]/) &&
      values.password.match(/[0-9]/)
    )
  ) {
    errors.password =
      "Password must contain at least one of each: Uppercase, lowercase, digit";
  }

  if (values.password && values.passwordConfirm !== values.password) {
    errors.passwordConfirm = "Password confirmation does not match password";
  }

  return errors;
};

export default validateAdminLogin;
