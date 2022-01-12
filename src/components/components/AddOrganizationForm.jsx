import React from "react";
import Select from "react-select";
import Input from "../shared/Input";
import { useFormData } from "../reducers/useFormData";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { v4 as uuidv4 } from "uuid";

const options = [
  { value: "partner", label: "Partner" },
  { value: "provider", label: "Provider" },
];

const AddOrganizationForm = ({ setShowModal }) => {
  const initialState = {
    name: "",
    industry: "",
    status: { value: "partner", label: "Partner" },
    contact: "",
  };
  const [state, dispatch] = useFormData(initialState);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const docRef = await addDoc(collection(db, "organizations"), {
            ...state,
            id: uuidv4(),
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
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
      <div></div>
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
      <div className="add-organization__modal-buttons">
        <button type="submit">Save</button>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </form>
  );
};

export default AddOrganizationForm;
