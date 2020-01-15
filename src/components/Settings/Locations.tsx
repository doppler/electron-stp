import React, { useState } from "react";
import { MdAddBox, MdEdit } from "react-icons/md";

type LocationProps = {
  code: string;
  name: string;
  handleEditLocationClick: (code: string) => void;
};

const Location = ({ code, name, handleEditLocationClick }: LocationProps) => {
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

const Locations: React.FC = () => {
  // @ts-ignore
  const [locations, setLocations] = useState(initialState); // eslint-disable-line @typescript-eslint/no-unused-vars

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
        </div>
      </div>
    </div>
  );
};

export default Locations;
