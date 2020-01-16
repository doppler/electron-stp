import React, { useState, useContext, useCallback, useEffect } from "react";
import { MdAddBox } from "react-icons/md";
import { useRouteMatch, Link } from "react-router-dom";
import DBContext from "../../DBContext";

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

const LocationsSummary = () => {
  const DB = useContext(DBContext);
  const match = useRouteMatch();

  // @ts-ignore
  const [locations, setLocations]: [TLocations, Function] = useState([]); // eslint-disable-line @typescript-eslint/no-unused-vars

  const getLocations = useCallback(async () => {
    let result;
    try {
      // @ts-ignore
      result = await DB.find({
        selector: { type: "location" }
      });
      return result.docs;
    } catch (error) {
      console.error(error);
    }
  }, [DB]);

  useEffect(() => {
    (async () => {
      const locations = await getLocations();
      setLocations(locations);
    })();
  }, [getLocations]);

  return (
    <div className="Locations panel">
      <div className="panel-header">
        <h2 className="panel-title">Locations</h2>
        <Link to={`${match.url}/location/NEW`}>
          <button className="icon">
            <MdAddBox />
          </button>
        </Link>
      </div>
      <div className="panel-body">
        <ul className="location-list">
          {locations.map(location => (
            <Link to={`${match.url}/location/${location.code}`}>
              <li key={location.code}>
                <div>{location.code}</div>
                <div>{location.name}</div>
              </li>
            </Link>
          ))}
        </ul>
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
