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
type TInstructorErrors = {
  uspaNumber?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  passwordConfirm?: string;
};
interface TInstructorValidationReturns extends TFormValidationReturns {
  values: IInstructor;
  errors: TInstructorErrors;
}
interface ValidateInstructorFunction {
  (values: IInstructor, isLogin: Boolean): TInstructorErrors;
}
