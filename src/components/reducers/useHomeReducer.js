import { useReducer } from "react";

const useHomeReducer = () => {
  const initialState = { drawer: true, activeLink: "dashboard" };

  function reducer(state, action) {
    switch (action.type) {
      case "ActiveLinkDashboard":
        return { ...state, activeLink: "dashboard" };
      case "ActiveLinkOrganizations":
        return { ...state, activeLink: "organizations" };
      case "ActiveLinkSales":
        return { ...state, activeLink: "sales" };
      case "ActiveLinkOrders":
        return { ...state, activeLink: "orders" };
      case "ToggleDrawer":
        return { ...state, drawer: !state.drawer };
      default:
        throw new Error("Error in reducer!");
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
};

export default useHomeReducer;
