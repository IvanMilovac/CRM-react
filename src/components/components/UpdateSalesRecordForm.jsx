import React from "react";
import Select from "react-select";
import Input from "../shared/Input";
import { useFormData } from "../reducers/useFormData";
/* import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config"; */

const options = [
  { value: "partner", label: "Partner" },
  { value: "provider", label: "Provider" },
];

const AddSalesRecordForm = ({
  setShowUpdateModal,
  salesRecordList,
  setSalesRecordList,
  recordIndex,
}) => {
  const organization = salesRecordList.filter(
    (org) => org.id === recordIndex
  )[0];
  const initialState = {
    name: organization.name,
    industry: organization.industry,
    status: organization.status,
    contact: organization.contact,
  };
  const [state, dispatch] = useFormData(initialState);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        /*
        ****Adding new doc in Firestore**** 
        try {
          const docRef = await addDoc(collection(db, "organizations"), {
            ...state,
            id: uuidv4(),
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        } */
        let objIndex = salesRecordList.findIndex(
          (obj) => obj.id === recordIndex
        );
        const newOrgs = [...salesRecordList];
        newOrgs[objIndex].name = state.name;
        newOrgs[objIndex].industry = state.industry;
        newOrgs[objIndex].status = state.status;
        newOrgs[objIndex].contact = state.contact;
        setSalesRecordList(newOrgs);
        localStorage.setItem("orgsList", JSON.stringify(newOrgs));
        setShowUpdateModal(false);
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
        <button onClick={() => setShowUpdateModal(false)}>Close</button>
      </div>
    </form>
  );
};

export default AddSalesRecordForm;
