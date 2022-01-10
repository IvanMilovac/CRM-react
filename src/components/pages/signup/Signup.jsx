import React from "react";

import "./Signup.scss";

const Signup = () => {
  const handleSignup = (e) => {
    e.preventDefault();
    console.log(e.target[0].value, e.target[1].value);
  };
  return (
    <div className="signup">
      <div className="signup__container">
        <form className="signup__container--form" onSubmit={handleSignup}>
          <label htmlFor="email">
            <input type="email" name="email" />
          </label>
          <label htmlFor="password">
            <input type="password" name="password" />
          </label>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
