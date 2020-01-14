import React from "react";
import useAuth from "../Auth/useAuth";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { user, logOut } = useAuth();
  const history = useHistory();
  const handleLogoutClick = () => {
    logOut();
    history.push("/login");
  };

  return (
    <div className="Home">
      <button onClick={handleLogoutClick}>Log Out</button>
      <code>{JSON.stringify(user, null, 2)}</code>
    </div>
  );
};

export default Home;
