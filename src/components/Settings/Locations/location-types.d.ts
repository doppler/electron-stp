interface ILocation extends ICouchDocument {
  name: string;
  code: string;
}
type TLocationList = Array<ILocation>;
type TEditLocationParams = {
  code?: string;
};
type TLocationErrors = {
  name?: string;
  code?: string;
};
interface TLocationValidationReturns extends TFormValidationReturns {
  values: ILocation;
  errors: TLocationErrors;
}
interface ValidateLocationFunction {
  (values: ILocation): TLocationErrors;
}
