type TAircraft = {
  readonly _rev?: string;
  _id?: string;
  _deleted?: boolean = false;
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
interface TAircraftValidationReturns extends TFormValidationReturns {
  values: TAircraft;
  errors: TAircraftErrors;
}
interface ValidateAircraftFunction {
  (values: TAircraft): TAircraftErrors;
}
