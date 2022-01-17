import React, { useState, useEffect } from "react";
import Select from "react-select";
import Input from "../shared/Input";
import { useFormData } from "../reducers/useFormData";
/* import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config"; */

const options = [
  { value: "completed", label: "Completed" },
  { value: "nagotiation", label: "Nagotiation" },
];

const UpdateSalesRecordForm = ({
  setShowUpdateModal,
  salesRecordList,
  setSalesRecordList,
  recordIndex,
}) => {
  const [companyOptions, setCompanyOptions] = useState([]);

  useEffect(() => {
    setCompanyOptions(
      JSON.parse(localStorage.getItem("orgsList")).map((item) => {
        return { label: item?.name, value: item?.name.toLowerCase() };
      })
    );
  }, []);
  const record = salesRecordList.filter((org) => org.id === recordIndex)[0];
  const initialState = {
    name: record?.name,
    company: record?.company?.value,
    status: record?.status?.value,
    amount: record?.amount,
    date: record?.date,
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
        const newRecord = [...salesRecordList];
        newRecord[objIndex].name = state.name;
        newRecord[objIndex].company = state.company;
        newRecord[objIndex].status = state.status;
        newRecord[objIndex].amount = state.amount;
        newRecord[objIndex].date = state.date;
        setSalesRecordList(newRecord);
        localStorage.setItem("salesList", JSON.stringify(newRecord));
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
        <button onClick={() => setShowUpdateModal(false)}>Close</button>
      </div>
    </form>
  );
};

export default UpdateSalesRecordForm;
