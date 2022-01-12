import React, { useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Input from "../../shared/Input";

import Logo from "../../../assets/images/logo.svg";

import "../../../scss/components/FormContainer.scss";

const initialFormState = {
  email: "",
  password: "",
  error: "",
  loading: false,
};

const Signup = () => {
  const [formState, setFormState] = useState(initialFormState);
  const { email, password, loading, error } = formState;

  const notify = (success, msg) =>
    success ? toast.success(msg) : toast.error(msg);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setFormState((prevState) => ({ ...prevState, error: "", loading: true }));
    try {
      await signup(email, password);
    } catch {
      notify(
        false,
        "Error occured during signup process, check email and password and try again!"
      );
      return setFormState((prevState) => ({
        ...prevState,
        loading: false,
        error:
          "Error occured during signup process, check email and password and try again!",
      }));
    }
    setFormState((prevState) => ({ ...prevState, loading: false }));
    navigate("/");
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      error: "",
    }));
  };

  return (
    <div className="container__wrapper">
      <div className="container">
        <div className="container__header">
          <img src={Logo} alt="brand logo" className="logo" />
        </div>
        <p className="container__title">Sign Up</p>
        <ToastContainer
          position="top-center"
          autoClose={7000}
          hideProgressBar={true}
          limit={3}
          transition={Zoom}
        />
        <form className="container__form" onSubmit={handleSignup}>
          <Input
            name="email"
            value={email}
            type="email"
            onChange={handleChange}
            className={`${error && "error"}`}
          />
          <Input
            name="password"
            value={password}
            type="password"
            onChange={handleChange}
            className={`${error && "error"}`}
          />
          <button type="submit" disabled={loading || !!error}>
            Signup
          </button>
        </form>
        <p>
          Already have account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
