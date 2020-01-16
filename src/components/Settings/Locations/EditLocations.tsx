import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFormValidation from "../../useFormValidation";
import useDB from "../../../useDB";

const INITIAL_STATE: TLocation = {
  code: "",
  name: ""
};

const validate = (values: TLocation) => {
  let errors: TLocationErrors = {};
  if (!values.code.match(/[A-Z]{3}/)) {
    errors.code = "Code must be at least 3 characters and UPPERCASE";
  }
  if (!values.name) {
    errors.name = "Name cannot be blank";
  }
  return errors;
};

const EditLocation = () => {
  const params: TEditLocationParams = useParams();
  const history = useHistory();
  const { get, put } = useDB();

  const [isNew, setNew] = useState(true);

  const {
    values,
    errors,
    setValues,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormValidation(INITIAL_STATE, validate, submit);

  async function submit() {
    if (!values._id || !values.type) {
      values._id = `location:${values.code}`;
      values.type = "location";
    }
    await put(values);
    history.goBack();
  }

  useEffect(() => {
    if (params.code === "NEW") return;

    setNew(false);

    (async () => {
      const doc = await get(`location:${params.code}`);
      setValues(doc);
    })();
  }, [params.code, get, setValues]);

  return (
    <div className="EditLocation">
      <h1>Edit {values.code}</h1>
      <form className="clean">
        <div>
          <input
            name="code"
            value={values.code}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="CODE"
            autoComplete="off"
            disabled={!isNew}
          />
        </div>
        {errors.code && <span className="error-text">{errors.code}</span>}
        <div>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Location Name"
            autoComplete="off"
          />
        </div>
        {errors.name && <span className="error-text">{errors.name}</span>}
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
};

export default EditLocation;
