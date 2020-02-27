interface IInstructor extends ICouchDocument {
  uspaNumber: string;
  name: string;
  email: string;
  phone: string;
  currentLocation?: string;
  password: string;
  passwordConfirm: string;
}
type TInstructorList = Array<IInstructor>;
type TEditInstructorParams = {
  uspaNumber?: string;
};
interface TInstructorValidationReturns extends TFormValidationReturns {
  values: IInstructor;
}
