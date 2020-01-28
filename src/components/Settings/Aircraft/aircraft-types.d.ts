interface IAircraft extends ICouchDocument {
  tailNumber: string;
  model: string;
  currentLocation?: string;
}
type TAircraftList = Array<IAircraft>;
type TEditAircraftParams = {
  tailNumber?: string;
};
// type TAircraftErrors = {
//   tailNumber?: string;
//   model?: string;
// };
type TValidationError = {
  message: string;
  path: string[];
  type: string;
  context: {
    label: string;
    key: string;
    child?: string;
    value?: string;
  };
};
interface TAircraftValidationReturns extends TFormValidationReturns {
  values: IAircraft;
  errors: TValidationError[];
}
// interface ValidateAircraftFunction {
//   (values: IAircraft): TAircraftErrors;
// }
