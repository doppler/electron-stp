import "./Header.css";
import { MdSettings, MdLock, MdHome } from "react-icons/md";
import { IconContext } from "react-icons";
import React from "react";
import useAuth from "./Auth/useAuth";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();

  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <div className="Header">
        <div className="left">
          <NavLink exact to="/" className="link">
            <MdHome />
          </NavLink>
        </div>
        <div className="right">
          <span>{user.name}</span>
          <span>{JSON.stringify(user.roles)}</span>
          <Link to="/logout" className="link">
            <MdLock />
          </Link>
          <NavLink to="/settings" className="link">
            <MdSettings />
          </NavLink>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Header;