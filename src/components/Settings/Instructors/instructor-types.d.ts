type TInstructor = {
  readonly _rev?: string;
  _id?: string;
  _deleted?: boolean = false;
  type: 'instructor';
  uspaNumber: string | number | undefined;
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
