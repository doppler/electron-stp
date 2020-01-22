type TLocation = {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  type: 'location';
  name: string;
  code: string;
};
type TLocations = Array<TLocation>;
type TEditLocationParams = {
  code?: string;
};
type TLocationErrors = {
  name?: string;
  code?: string;
};
interface TLocationValidationReturns extends TFormValidationReturns {
  values: TLocation;
  errors: TLocationErrors;
}
