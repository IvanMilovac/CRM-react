import React from "react";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Home component</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Home;
