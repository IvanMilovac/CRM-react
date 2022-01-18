import React, { useState, useEffect } from "react";
import Select from "react-select";
import Input from "../shared/Input";
import { useFormData } from "../reducers/useFormData";
/* import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config"; */

const options = [
  { value: "infoquote", label: "Informative quote" },
  { value: "nagotiation", label: "Nagotiation" },
  { value: "quote", label: "Quote" },
];

const UpdateSalesRecordForm = ({
  setShowUpdateModal,
  ordersRecordList,
  setOrdersRecordList,
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

  const record = ordersRecordList.filter((org) => org.id === recordIndex)[0];

  const initialState = {
    name: record?.name,
    company: record?.company,
    status: options.filter((item) => item?.label === record?.status?.label)[0],
    amount: record?.amount,
    date: record?.date,
  };

  const [state, dispatch] = useFormData(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
        ****Adding new doc in Firestore**** 
        try {
          const docRef = await addDoc(collection(db, "orders"), {
            ...state,
            id: uuidv4(),
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        } */
    let objIndex = ordersRecordList.findIndex((obj) => obj.id === recordIndex);
    const newRecords = [...ordersRecordList];
    newRecords[objIndex].name = state.name;
    newRecords[objIndex].company = state.company;
    newRecords[objIndex].status = state.status;
    newRecords[objIndex].amount = state.amount;
    newRecords[objIndex].date = state.date;
    setOrdersRecordList(newRecords);
    localStorage.setItem("ordersList", JSON.stringify(newRecords));
    setShowUpdateModal(false);
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
          required
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
          required
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
        required
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
        required
      />
      <div className="add-organization__modal-buttons">
        <button type="submit">Save</button>
        <button onClick={() => setShowUpdateModal(false)}>Close</button>
      </div>
    </form>
  );
};

export default UpdateSalesRecordForm;
