type TInstructor = {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  type: 'instructor';
  uspaNumber: null | Number;
  name: string;
  email: string;
  phone: string;
  currentLocation?: string;
};
type TInstructorList = Array<TInstructor>;
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
  values: TInstructor;
  errors: TInstructorErrors;
}
