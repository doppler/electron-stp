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
}
interface IJump extends ICouchDocument {
  type: 'jump';
  jumpNumber: number;
  diveFlow: number;
  date: string;
  location: string;
  instructor: string;
  aircraft: string;
  exitAltitude: number;
  deploymentAltitude: number;
  exit: string;
  freefall: string;
  canopy: string;
  landing: string;
  recommendedNextDF: number | undefined;
}
type TJumpList = Array<IJump>;
interface TJumpValidationReturns extends TFormValidationReturns {
  values: IJump;
}
