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
interface IJump extends ICouchDocument {
  type: 'jump';
  jumpNumber: number;
  diveFlow: number;
  date: Date;
  location: string;
  instructor: string;
  aircraft: string;
  exitAltitude: number;
  deploymentAltitude: number;
  exit: string;
  freefall: string;
  canopy: string;
  landing: string;
  recommendedNextDF: number | null;
}
type TJumpList = Array<IJump>;
interface TJumpValidationReturns extends TFormValidationReturns {
  values: IJump;
  errors: TValidationError[];
}
// TODO: maybe move 'errors' to TFormValidationReturns?
