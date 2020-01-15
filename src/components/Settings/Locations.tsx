import React, { useState } from "react";
import { MdAddBox, MdEdit, MdSave } from "react-icons/md";
// import useFormValidation from "../useFormValidation";

const initialState = [
  {
    code: "ATL",
    name: "Spaceland Atlanta"
  },
  {
    code: "DAL",
    name: "Spaceland Dallas"
  },
  {
    code: "CLW",
    name: "Spaceland Clewiston"
  }
];

type LocationProps = {
  code: string;
  name: string;
  handleEditLocationClick: (code: string) => void;
};

const Location: React.FC<LocationProps> = ({
  code,
  name,
  handleEditLocationClick
}: LocationProps) => {
  return (
    <>
      <div>{name}</div>
      <div>{code}</div>
      <div>
        <button
          className="icon"
          onClick={() => handleEditLocationClick(code)}
          id={code}
        >
          <MdEdit />
        </button>
      </div>
    </>
  );
};

const Locations = () => {
  // @ts-ignore
  const [locations, setLocations] = useState(initialState); // eslint-disable-line @typescript-eslint/no-unused-vars

  // const { handleChange, values, errors} = useFormValidation(initialState, () => {}, () => {})

  const handleEditLocationClick = (code: string) => {
    console.log(code);
  };

  return (
    <div className="Locations panel">
      <div className="panel-header">
        <h2 className="panel-title">Locations</h2>
        <button className="icon">
          <MdAddBox />
        </button>
      </div>
      <div className="panel-body">
        <div className="location-grid grid">
          {locations.map(location => (
            <Location
              key={location.code}
              code={location.code}
              name={location.name}
              handleEditLocationClick={handleEditLocationClick}
            />
          ))}
          <LocationEditor />
        </div>
      </div>
    </div>
  );
};

export default Locations;

const LocationEditor = () => {
  const initialState = {
    name: "",
    code: ""
  };

  const [values, setValues] = useState(initialState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    console.log(event.target.value);
    setValues(prevValues => {
      return {
        ...prevValues,
        [event.target.name]: event.target.value
      };
    });
  };
  return (
    <>
      <div>
        <input
          name="name"
          value={values.name}
          onChange={handleInputChange}
          placeholder="Location Name"
        />
      </div>
      <div>
        <input
          name="code"
          value={values.code}
          onChange={handleInputChange}
          placeholder="CODE"
        />
      </div>
      <div>
        <button className="icon">
          <MdSave />
        </button>
      </div>
    </>
  );
};
