declare module 'pouchdb-auth';

interface ICouchDocument {
  readonly _rev?: string;
  _id?: string;
  _deleted?: boolean = false;
  type: 'user' | 'location' | 'aircraft' | 'instructor' | 'student' | 'jump';
}

interface IAuthUser {
  name: string;
  roles: string[];
}

interface IValidationError {
  message: string;
  path: string[];
  type: string;
  context: {
    label: string;
    key: string;
    child?: string;
    value?: string;
  };
}

type DBSyncSettings = {
  doSync: boolean;
  url: string;
  username?: string;
  password?: string;
};

type TLoginFormValues = {
  email: string;
  password: string;
  passwordConfirm?: string;
};

interface TFormValidationReturns {
  values: any;
  errors: IValidationError[];
  handleChange?: (event: React.ChangeEvent) => void;
  handleBlur?: (event: React.FocusEvent) => void;
  handleSubmit?: (event: React.SyntheticEvent) => void;
  setValues: React.Dispatch<any>;
  isSubmitting?: Boolean;
}

type TIndexDefinition = {
  index: {
    fields: string[];
    ddoc: string;
    name: string;
  };
};

interface ILocation extends ICouchDocument {
  dzname: string;
  code: string;
}

interface TLocationValidationReturns extends TFormValidationReturns {
  values: ILocation;
}

interface IAircraft extends ICouchDocument {
  tailNumber: string;
  model: string;
  currentLocation?: string;
}

interface TAircraftValidationReturns extends TFormValidationReturns {
  values: IAircraft;
}

interface IInstructor extends ICouchDocument {
  uspaNumber: string;
  name: string;
  email: string;
  phone: string;
  currentLocation?: string;
  password: string;
  passwordConfirm: string;
}

interface TInstructorValidationReturns extends TFormValidationReturns {
  values: IInstructor;
}

interface IStudent extends ICouchDocument {
  name: string;
  email: string;
  phone: string;
  hometown?: string;
  currentLocation?: string;
  locations: [];
}

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

interface TJumpValidationReturns extends TFormValidationReturns {
  values: IJump;
}
