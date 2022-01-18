import React, { useState } from "react";
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

import Modal from "./Modal";
import Input from "./Input";

import Logo from "../../assets/images/logo.svg";

import "../../scss/components/Navigation.scss";

const Navigation = ({ state, dispatch }) => {
  const [showModal, setShowModal] = useState(false);
  const { drawer } = state;
  const { logout, currentUser, updateUserEmail, updateUserPassword } =
    useAuth();
  const { email, password } = currentUser;
  const [newEmail, setNewEmail] = useState(email || "");
  const [newPassword, setNewPassword] = useState(password || "");

  return (
    <nav className={`nav ${!drawer && "hide_nav"}`}>
      <Modal
        show={showModal}
        onCancel={setShowModal}
        className=""
        header="Change user data"
        contentClass="additionalContentClass"
        footerClass="additionalFooterClass"
      >
        <form>
          <Input
            name="new email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className=""
            required
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              try {
                await updateUserEmail(newEmail);
                setNewEmail("");
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Update Email
          </button>
          <Input
            name="new password"
            type="password"
            autocomplete="current-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className=""
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              try {
                await updateUserPassword(newPassword);
                setNewPassword("");
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Update Password
          </button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </form>
      </Modal>
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
            <button onClick={() => setShowModal(true)}>Change user data</button>
          </div>
        </div>
      </div>
      <ul className="nav__links">
        <li
          onClick={() =>
            dispatch({ type: "HandleChange", payload: "dashboard" })
          }
        >
          <FontAwesomeIcon icon={faDesktop} />
          Dashboard
        </li>
        <li
          onClick={() =>
            dispatch({ type: "HandleChange", payload: "organizations" })
          }
        >
          <FontAwesomeIcon icon={faBuilding} />
          Organizations
        </li>
        <li
          onClick={() => dispatch({ type: "HandleChange", payload: "sales" })}
        >
          <FontAwesomeIcon icon={faDollarSign} />
          Sales
        </li>
        <li
          onClick={() => dispatch({ type: "HandleChange", payload: "orders" })}
        >
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
