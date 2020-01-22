const validateAircraft: ValidateAircraftFunction = values => {
  const errors: TAircraftErrors = {};
  if (values.tailNumber && !values.tailNumber.match(/^N/)) {
    errors.tailNumber = 'Tail number must start with N';
  }
  return errors;
};

export default validateAircraft;
