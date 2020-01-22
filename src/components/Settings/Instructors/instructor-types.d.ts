interface IInstructor extends ICouchDocument {
  uspaNumber: string | number | undefined;
  name: string;
  email: string;
  phone: string;
  currentLocation?: string;
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
};
interface TInstructorValidationReturns extends TFormValidationReturns {
  values: IInstructor;
  errors: TInstructorErrors;
}
interface ValidateInstructorFunction {
  (values: IInstructor): TInstructorErrors;
}
