import { useReducer } from "react";

const useHomeReducer = (screenWidth) => {
  const initialState = {
    drawer: screenWidth > 768,
    activeLink: "dashboard",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "ActiveLinkDashboard":
        return { activeLink: "dashboard", drawer: !state.drawer };
      case "ActiveLinkOrganizations":
        return { activeLink: "organizations", drawer: !state.drawer };
      case "ActiveLinkSales":
        return { activeLink: "sales", drawer: !state.drawer };
      case "ActiveLinkOrders":
        return { activeLink: "orders", drawer: !state.drawer };
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
