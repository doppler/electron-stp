import React, { useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import useFormValidation from "../../useFormValidation";
import DBContext from "../../DBContext";

const INITIAL_STATE: TLocation = {
  code: "ABC",
  name: "Test Location"
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
  const {
    values,
    errors,
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
        console.log(doc);
        return doc;
      } catch (error) {
        console.error(error);
      } finally {
        return doc;
      }
    },
    [DB]
  );

  async function submit() {
    let result;
    const doc = await getDoc(`location:${values.code}`);
    if (doc) {
      console.log("TODO: save doc", { doc });
    } else {
      const newDoc = { ...values };
      newDoc.type = "location";
      newDoc._id = `location:${values.code}`;
      console.log({ newDoc });
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
  }, [params.code, DB]);

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
