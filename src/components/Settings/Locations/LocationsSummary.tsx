import React, { useState } from "react";
import { MdAddBox, MdEdit } from "react-icons/md";
import { useHistory, useRouteMatch, Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

type TLocations = [
  {
    name: string;
    code: string;
  }
];

const LocationsSummary = () => {
  const history = useHistory();
  const match = useRouteMatch();

  // @ts-ignore
  const [locations, setLocations]: [TLocations, Function] = useState([]); // eslint-disable-line @typescript-eslint/no-unused-vars

  const handleAddLocationClick = () => {
    console.log("Add Location");
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
          {locations.length ? (
            locations.map(location => (
              <>
                <div>{location.name}</div>
                <div>{location.code}</div>
                <div>
                  <button
                    className="icon"
                    onClick={() =>
                      history.push(`${match.url}/location/${location.code}`)
                    }
                  >
                    <MdEdit />
                  </button>
                </div>
              </>
            ))
          ) : (
            <div>
              <Link to={`${match.url}/location/NEW`}>
                <button>Add Location</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationsSummary;

/*
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
*/
