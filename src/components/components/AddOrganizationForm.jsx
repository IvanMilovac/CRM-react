import React, { useReducer } from "react";
import Select from "react-select";
import Input from "../shared/Input";

import "./Form.scss";

const options = [
  { value: "partner", label: "Partner" },
  { value: "provider", label: "Provider" },
];

const AddOrganizationForm = ({ setShowModal }) => {
  const initialState = {
    name: "",
    industry: "",
    status: "partner",
    contact: "",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "HandleChange":
        return { ...state, [action.payload.name]: action.payload.value };
      default:
        throw new Error("Error in reducer!");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(state);
        setShowModal(false);
      }}
    >
      <Input
        name="name"
        value={state.name}
        onChange={(e) =>
          dispatch({
            type: "HandleChange",
            payload: { name: e.target.name, value: e.target.value },
          })
        }
        className=""
        required
      />
      <Input
        name="industry"
        value={state.industry}
        onChange={(e) =>
          dispatch({
            type: "HandleChange",
            payload: { name: e.target.name, value: e.target.value },
          })
        }
        className=""
        required
      />
      <div style={{ width: "100%" }}>
        <Select
          name="status"
          value={state.status}
          placeholder="status (required)"
          options={options}
          onChange={(e) =>
            dispatch({
              type: "HandleChange",
              payload: { name: "status", value: e },
            })
          }
        />
      </div>
      <Input
        name="contact"
        value={state.contact}
        onChange={(e) =>
          dispatch({
            type: "HandleChange",
            payload: { name: e.target.name, value: e.target.value },
          })
        }
        className=""
      />
      <button type="submit">Save data</button>
      <button onClick={() => setShowModal(false)}>Close</button>
    </form>
  );
};

export default AddOrganizationForm;
