import React from "react";
import { useAuth } from "../context/AuthContext";

import { stringSlicer } from "../../utils/utils";

import Avatar from "../../assets/images/avatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faDesktop,
  faDollarSign,
  faFile,
  faSignOutAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../../assets/images/logo.svg";

import "../../scss/components/Navigation.scss";

const Navigation = ({ state, dispatch }) => {
  const { drawer } = state;
  const { logout, currentUser } = useAuth();
  const { email } = currentUser;

  return (
    <nav className={`nav ${!drawer && "hide_nav"}`}>
      <div
        className={`nav__toggle ${!drawer && "rotateClockWise"}`}
        onClick={() => dispatch({ type: "ToggleDrawer" })}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="2x" color="#000a" />
      </div>
      <div className="nav__header">
        <div className="nav__logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="nav__header-user">
          <img src={Avatar} alt="User pic" />
          <div className="nav__header-user_meta">
            <p className="nav__header-user-email">
              {email.length > 17 ? stringSlicer(email, 0, 17) : email}
            </p>
            <button>Change user data</button>
          </div>
        </div>
      </div>
      <ul className="nav__links">
        <li onClick={() => dispatch({ type: "ActiveLinkDashboard" })}>
          <FontAwesomeIcon icon={faDesktop} />
          Dashboard
        </li>
        <li onClick={() => dispatch({ type: "ActiveLinkOrganizations" })}>
          <FontAwesomeIcon icon={faBuilding} />
          Organizations
        </li>
        <li onClick={() => dispatch({ type: "ActiveLinkSales" })}>
          <FontAwesomeIcon icon={faDollarSign} />
          Sales
        </li>
        <li onClick={() => dispatch({ type: "ActiveLinkOrders" })}>
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
