import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Signup.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
    } catch (e) {
      console.log(e);
    }
    setEmail("");
    setPassword("");
    navigate("/");
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
        <p>
          Already have account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
