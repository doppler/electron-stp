interface ILocation extends ICouchDocument {
  dzname: string;
  code: string;
}
type TLocationList = Array<ILocation>;
type TEditLocationParams = {
  code?: string;
};
interface TLocationValidationReturns extends TFormValidationReturns {
  values: ILocation;
  errors: TValidationError[];
}
