interface IStudent extends ICouchDocument {
  name: string;
  email: string;
  phone: string;
  hometown?: string;
  currentLocation?: string;
  locations: [];
}
type TStudentList = Array<IStudent>;
type TEditStudentParams = {
  id?: string;
};
interface TStudentValidationReturns extends TFormValidationReturns {
  values: IStudent;
  errors: TValidationError[];
}
