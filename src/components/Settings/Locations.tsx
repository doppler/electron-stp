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

interface LocationProps {
  code: string;
  name: string;
  handleEditLocationClick: (code: string) => void;
}

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
  const [addLocation, setAddLocation] = useState(false);
  const [values, setValues] = useState({ name: "", code: "" });

  // const { handleChange, values, errors} = useFormValidation(initialState, () => {}, () => {})

  const handleEditLocationClick = (code: string) => {
    console.log(code);
  };

  const handleAddLocationClick = () => {
    setAddLocation(true);
    console.log("Add Location");
  };

  const handleSaveLocation = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(values);
    const updatedLocations = locations.filter(
      location => location.code !== values.code
    );
    setLocations([...updatedLocations, values]);
    setAddLocation(false);
  };

  return (
    <div className="Locations panel">
      <div className="panel-header">
        <h2 className="panel-title">Locations</h2>
        <button className="icon" onClick={handleAddLocationClick}>
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
          {addLocation ? (
            <LocationEditor
              values={values}
              setValues={setValues}
              handleSaveLocation={handleSaveLocation}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Locations;

interface LocationEditorProps {
  values: {
    name: string;
    code: string;
  };
  setValues: Function;
  handleSaveLocation: (event: React.FormEvent<Element>) => void;
}

const LocationEditor: React.FC<LocationEditorProps> = ({
  values,
  setValues,
  handleSaveLocation
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((prevValues: any) => {
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
          autoComplete="off"
        />
      </div>
      <div>
        <input
          name="code"
          value={values.code}
          onChange={handleInputChange}
          placeholder="CODE"
          autoComplete="off"
        />
      </div>
      <div>
        <button className="icon" onClick={handleSaveLocation}>
          <MdSave />
        </button>
      </div>
    </>
  );
};
