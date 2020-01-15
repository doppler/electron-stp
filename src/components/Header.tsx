import "./Header.css";
import { MdSettings, MdLock } from "react-icons/md";
import { IconContext } from "react-icons";
import React from "react";
import useAuth from "./Auth/useAuth";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const { user, logOut } = useAuth();
  const history = useHistory();

  const handleLogoutClick = () => {
    logOut();
    history.push("/login");
  };

  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <div className="Header">
        <div className="left"></div>
        <div className="right">
          <span>{user.name}</span>
          <span>{JSON.stringify(user.roles)}</span>
          <MdLock onClick={handleLogoutClick} />
          <Link to="/settings" className="link">
            <MdSettings />
          </Link>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Header;
