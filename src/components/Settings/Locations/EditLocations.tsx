import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const INITIAL_STATE: TLocation = {
  name: "",
  code: ""
};

const EditLocation = () => {
  const params: TEditLocationParams = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation]: [TLocation, Function] = useState(
    INITIAL_STATE
  );

  useEffect(() => {
    if (params.code === "NEW") return;
  }, [params.code]);

  return (
    <div className="EditLocation">
      <h1>Edit {location.code}</h1>
    </div>
  );
};

export default EditLocation;
