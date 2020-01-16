import React, { useEffect, useContext, useCallback, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFormValidation from "../../useFormValidation";
import DBContext from "../../DBContext";

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
  const DB = useContext(DBContext);
  const params: TEditLocationParams = useParams();
  const history = useHistory();

  const [isNew, setNew] = useState(true);

  const {
    values,
    errors,
    setValues,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormValidation(INITIAL_STATE, validate, submit);

  const getDoc = useCallback(
    async _id => {
      let doc;
      try {
        // @ts-ignore
        doc = await DB.get(_id);
        // console.log(doc);
        return doc;
      } catch (error) {
        console.error(error);
      }
    },
    [DB]
  );

  async function submit() {
    let result;
    const doc = await getDoc(`location:${values.code}`);
    if (doc) {
      console.log("TODO: save doc", { values });
      try {
        // @ts-ignore
        result = await DB.put(values);
        console.log(result);
        history.goBack();
      } catch (error) {
        console.error(error);
      }
    } else {
      const newDoc = { ...values };
      newDoc.type = "location";
      newDoc._id = `location:${values.code}`;
      try {
        // @ts-ignore
        result = await DB.put(newDoc);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    if (params.code === "NEW") return;

    setNew(false);

    (async () => {
      const doc = await getDoc(`location:${params.code}`);
      console.log(doc);
      setValues(doc);
    })();
  }, [params.code, getDoc, setValues]);

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
