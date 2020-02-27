interface IAircraft extends ICouchDocument {
  tailNumber: string;
  model: string;
  currentLocation?: string;
}
type TAircraftList = Array<IAircraft>;
type TEditAircraftParams = {
  tailNumber?: string;
};
interface TAircraftValidationReturns extends TFormValidationReturns {
  values: IAircraft;
}
