import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import "./Login.scss";

const Login = () => {
  const { currentUser, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  return (
    <div className="login">
      <div className="login__container">
        <form className="login__container--form" onSubmit={handleLogin}>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              onChange={handleEmailChange}
              value={email}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
              value={password}
            />
          </label>
          <button type="submit" disabled={loading}>
            Login
          </button>
          {currentUser && <p>Logged in</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
