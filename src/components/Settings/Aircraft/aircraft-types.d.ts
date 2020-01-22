interface IAircraft extends ICouchDocument {
  tailNumber: string;
  model: string;
  currentLocation?: string;
}
type TAircraftList = Array<IAircraft>;
type TEditAircraftParams = {
  tailNumber?: string;
};
type TAircraftErrors = {
  tailNumber?: string;
  model?: string;
};
interface TAircraftValidationReturns extends TFormValidationReturns {
  values: IAircraft;
  errors: TAircraftErrors;
}
interface ValidateAircraftFunction {
  (values: IAircraft): TAircraftErrors;
}
