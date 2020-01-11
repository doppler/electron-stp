import React from "react";
import useFormValidation from "./useFormValidation";
import validateAdminLogin from "./validateAdminLogin";
import "./CreateAdminLogin.css";

const INITIAL_STATE = {
  email: "",
  password: "",
  passwordConfirm: ""
};

export default () => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors
    // isSubitting
  } = useFormValidation(INITIAL_STATE, validateAdminLogin, authenticateUser);

  // const [login, setLogin] = useState(true);

  async function authenticateUser() {
    const { email, password } = values;
    console.log("Login", email, password);
  }

  return (
    <div className="CreateAdminLogin">
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        required
        placeholder="Email Address"
        className={errors.email ? "invalid" : ""}
      />
      {errors.email && <span className="error-text">{errors.email}</span>}
      <input
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        required
        placeholder="Password"
        className={errors.password ? "invalid" : ""}
      />
      {errors.password && <span className="error-text">{errors.password}</span>}
      <input
        name="passwordConfirm"
        value={values.passwordConfirm}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        placeholder="Confirm Password"
        className={errors.passwordConfirm ? "invalid" : ""}
      />
      {errors.passwordConfirm && (
        <span className="error-text">{errors.passwordConfirm}</span>
      )}

      <button onClick={handleSubmit}>Create Admin Login</button>
    </div>
  );
};
