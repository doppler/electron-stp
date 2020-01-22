type TAircraft = {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
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
