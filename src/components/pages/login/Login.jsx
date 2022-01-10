import React from "react";

import "./Login.scss";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.target[0].value, e.target[1].value);
  };
  return (
    <div className="login">
      <div className="login__container">
        <form className="login__container--form" onSubmit={handleLogin}>
          <label htmlFor="email">
            <input type="email" name="email" />
          </label>
          <label htmlFor="password">
            <input type="password" name="password" />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
