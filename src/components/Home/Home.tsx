import "./Home.css";
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
      <div className="Header">
        <div className="left">
          <span>Hello</span>
        </div>
        <div className="right">
          <span>{user.name}</span>
          <span>{JSON.stringify(user.roles)}</span>
          <button onClick={handleLogoutClick}>Log Out</button>
        </div>
      </div>
      <div className="Content">
        <code>{JSON.stringify(user, null, 2)}</code>
      </div>
    </div>
  );
};

export default Home;
