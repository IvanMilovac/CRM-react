import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Logo from "../../../assets/images/logo.svg";

import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      setLoading(false);
      return setError("Something went wrong, try again!");
    }
    setLoading(false);
    navigate("/");
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__container-header">
          <img src={Logo} alt="brand logo" className="logo" />
        </div>
        <p className={`login__container-error ${error && "error-text"}`}>
          {error}{" "}
          <span
            style={{ display: !!error ? "initial" : "none" }}
            onClick={() => setError("")}
          >
            &times;
          </span>
        </p>
        <form
          className="login__container-form"
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <label htmlFor="email" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleEmailChange}
            value={email}
            className={`${error && "error"}`}
          />
          <label htmlFor="password" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
            className={`${error && "error"}`}
          />
          <button type="submit" disabled={loading || !!error}>
            Login
          </button>
          {currentUser && <p>Logged in</p>}
        </form>
        <p>
          Don't have account yet? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
