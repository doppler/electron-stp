import React from "react";
import { useParams } from "react-router-dom";

type TEditLocationParams = {
  id?: string;
};

const EditLocation = () => {
  const params: TEditLocationParams = useParams();

  return (
    <div className="EditLocation">
      <h1>Edit {params.id}</h1>
    </div>
  );
};

export default EditLocation;
