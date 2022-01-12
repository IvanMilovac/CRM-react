import { useReducer } from "react";

const useHomeReducer = (screenWidth, lsNav) => {
  const initialState = {
    drawer: screenWidth > 768,
    activeLink: lsNav || "dashboard",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "HandleChange":
        return { activeLink: action.payload, drawer: !state.drawer };
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
