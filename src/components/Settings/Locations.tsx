import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAddBox, MdEdit } from "react-icons/md";

type LocationProps = {
  code: string;
  name: string;
};

const Location = ({ code, name }: LocationProps) => {
  return (
    <>
      <div>{name}</div>
      <div>{code}</div>
      <div>
        <button className="icon">
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
  const [locations, setLocations] = useState(initialState);
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
            <Location code={location.code} name={location.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locations;
