import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "HandleChange":
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      throw new Error("Error in reducer!");
  }
};

export const useFormData = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};
