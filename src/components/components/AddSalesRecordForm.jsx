import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../shared/Input";
import { useFormData } from "../reducers/useFormData";
/* import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";*/
import { v4 as uuidv4 } from "uuid";

const options = [
  { value: "completed", label: "Completed" },
  { value: "nagotiation", label: "Nagotiation" },
];

const AddSalesRecordForm = ({
  setShowAddModal,
  salesRecordList,
  setSalesRecordList,
}) => {
  const [companyOptions, setCompanyOptions] = useState([]);

  const today = new Date();

  const initialState = {
    name: "",
    amount: "",
    date: `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`,
  };

  const [state, dispatch] = useFormData(initialState);
  useEffect(() => {
    setCompanyOptions(
      JSON.parse(localStorage.getItem("orgsList")).map((item) => {
        return { value: item?.name, label: item?.name.toLowerCase() };
      })
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* 
    ****Update single doc in Firestore****
    try {
      const docRef = await updateDoc(collection(db, "sales"), {id: uuidv4(),{...state});
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    } */
    const newSRState = [...salesRecordList, { ...state, id: uuidv4() }];
    setSalesRecordList(newSRState);
    localStorage.setItem("salesList", JSON.stringify(newSRState));
    setShowAddModal(false);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div></div>
      <div style={{ width: "100%" }}>
        <Select
          name="company"
          value={state.company}
          placeholder="company (required)"
          options={companyOptions}
          onChange={(e) =>
            dispatch({
              type: "HandleChange",
              payload: { name: "company", value: e },
            })
          }
        />
      </div>
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
        name="amount"
        value={state.amount}
        onChange={(e) =>
          dispatch({
            type: "HandleChange",
            payload: { name: e.target.name, value: e.target.value },
          })
        }
        className=""
      />
      <Input
        name="date"
        value={state.date}
        type="date"
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
        <button onClick={() => setShowAddModal(false)}>Close</button>
      </div>
    </form>
  );
};

export default AddSalesRecordForm;
