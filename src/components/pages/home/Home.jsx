import Navigation from "../../shared/Navigation";
import { Dashboard, Organizations, Sales, Orders } from "../../components";

import useHomeReducer from "../../reducers/useHomeReducer";

import "./Home.scss";

const Home = () => {
  let intViewportWidth = window.innerWidth;

  const [state, dispatch] = useHomeReducer(intViewportWidth);

  return (
    <main className="home_container">
      <Navigation state={state} dispatch={dispatch} />
      {state.activeLink === "dashboard" && <Dashboard />}
      {state.activeLink === "organizations" && <Organizations />}
      {state.activeLink === "sales" && <Sales />}
      {state.activeLink === "orders" && <Orders />}
    </main>
  );
};

export default Home;
