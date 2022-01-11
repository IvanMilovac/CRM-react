import React, { useState } from "react";

import "./Signup.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
    } catch (e) {
    }
  };

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="signup">
      <div className="signup__container">
        <form className="signup__container--form" onSubmit={handleSignup}>
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
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
