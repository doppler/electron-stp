const validate: ValidateLocationFunction = values => {
  const errors: TLocationErrors = {};
  if (values.code && !values.code.match(/[A-Z]{3}/)) {
    errors.code = 'Code must be at least 3 characters and UPPERCASE';
  }
  if (values.name && values.name.length < 2) {
    errors.name = 'Really? One character? No.';
  }
  return errors;
};

export default validate;
