const validate: ValidateInstructorFunction = (
  values: IInstructor,
  isLogin: Boolean
) => {
  const errors: TInstructorErrors = {};
  if (values.uspaNumber && !values.uspaNumber.match(/^[0-9]+$/)) {
    errors.uspaNumber = 'USPA # must only contain numbers';
  }

  if (values.name && !values.name.match(/^[A-Z]/)) {
    errors.name = 'Please capitalize name';
  }

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  if (values.password) {
    if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (
      values.password &&
      !(
        values.password.match(/[A-Z]/) &&
        values.password.match(/[a-z]/) &&
        values.password.match(/[0-9]/)
      )
    ) {
      errors.password =
        'Password must contain at least one of each: Uppercase, lowercase, digit';
    }

    if (
      values.password &&
      isLogin &&
      values.passwordConfirm !== values.password
    ) {
      errors.passwordConfirm = 'Password confirmation does not match password';
    }
  }

  return errors;
};

export default validate;
