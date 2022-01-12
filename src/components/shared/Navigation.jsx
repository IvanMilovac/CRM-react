import React from "react";
import { useAuth } from "../context/AuthContext";
import Avatar from "../../assets/images/avatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faDesktop,
  faDollarSign,
  faFile,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../../assets/images/logo.svg";

import "../../scss/components/Navigation.scss";

const Navigation = () => {
  const { logout } = useAuth();
  return (
    <nav className="nav">
      <div className="nav__header">
        <div className="nav__logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="nav__header-user">
          <img src={Avatar} alt="User pic" />
          <div className="nav__header-user_meta">
            <p className="nav__header-user-email">email@email.com</p>
            <button>Change user data</button>
          </div>
        </div>
      </div>
      <ul className="nav__links">
        <li>
          <FontAwesomeIcon icon={faDesktop} />
          Dashboard
        </li>
        <li>
          <FontAwesomeIcon icon={faBuilding} />
          Organizations
        </li>
        <li>
          <FontAwesomeIcon icon={faDollarSign} />
          Sales
        </li>
        <li>
          <FontAwesomeIcon icon={faFile} />
          Orders
        </li>
      </ul>
      <div className="nav__logout" onClick={() => logout()}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        Logout
      </div>
    </nav>
  );
};

export default Navigation;
