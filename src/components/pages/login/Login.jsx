import React, { useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/Input";

import { useAuth } from "../../context/AuthContext";

import Logo from "../../../assets/images/logo.svg";

import "../../../scss/components/FormContainer.scss";

const initialFormState = {
  email: "",
  password: "",
  error: "",
  loading: false,
};

const Login = () => {
  const [formState, setFormState] = useState(initialFormState);
  const { email, password, loading, error } = formState;

  const { login, resetPassword } = useAuth();

  const navigate = useNavigate();

  const notify = (success, msg) =>
    success ? toast.success(msg) : toast.error(msg);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormState((prevState) => ({ ...prevState, error: "", loading: true }));
    try {
      await login(email, password);
    } catch {
      notify(
        false,
        "Error occured during login, check email and password and try again!"
      );
      return setFormState((prevState) => ({
        ...prevState,
        loading: false,
        error:
          "Error occured during login, check email and password and try again!",
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

  const resetPasswordEmail = async () => {
    try {
      await resetPassword(email);
      notify(true, "Email sent, check inbox or junk!");
    } catch {
      notify(false, "Something went wrong, try again!");
    }
  };

  return (
    <main className="container__wrapper">
      <div className="container">
        <div className="container__header">
          <img src={Logo} alt="brand logo" className="logo" />
        </div>
        <p className="container__title">Log In</p>
        <ToastContainer
          position="top-center"
          autoClose={7000}
          hideProgressBar={true}
          limit={3}
          transition={Zoom}
        />
        <form className="container__form" onSubmit={handleLogin}>
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
            autocomplete="current-password"
            onChange={handleChange}
            className={`${error && "error"}`}
          />
          <button type="submit" disabled={loading || !!error}>
            Login
          </button>
        </form>
        <p>
          Forget password?{" "}
          <span onClick={resetPasswordEmail} className="container__reset">
            Reset
          </span>
        </p>
        <p>
          Don't have account yet? <a href="/signup">Sign up</a>
        </p>
      </div>
    </main>
  );
};

export default Login;
