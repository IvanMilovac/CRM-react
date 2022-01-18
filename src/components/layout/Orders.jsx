import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt, faPen } from "@fortawesome/free-solid-svg-icons";
/* import { collection, doc, query, getDocs, deleteDoc } from "firebase/firestore"; */
import AddOrdersRecordForm from "../components/AddOrdersRecordForm";
import UpdateOrdersRecordForm from "../components/UpdateOrdersRecordForm";
import Modal from "../shared/Modal";

const Orders = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [ordersRecordList, setOrdersRecordList] = useState(
    JSON.parse(localStorage.getItem("ordersList")) || []
  );
  const [recordToUpdateId, setRecordToUpdateId] = useState();

  useEffect(() => {
    /* 
    ****Fetch organization data from Firestore**** 
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setOrdersList(data);
    };
    fetchOrders(); */
  }, [ordersRecordList]);

  const handleDeleteClick = useCallback(
    async (e) => {
      e = e || window.event;
      var target = e.srcElement || e.target;
      while (target && target.nodeName !== "TR") {
        target = target.parentNode;
      }
      const index = target.getAttribute("dataid");
      const filteredRecords = ordersRecordList.filter(
        (org) => org.id !== index
      );
      setOrdersRecordList(filteredRecords);
      localStorage.setItem("ordersList", JSON.stringify(filteredRecords));
      /*
    ****Deleting sales record from Firestore****
     try {
      await deleteDoc(doc(db, "sales", index));
      setSalesRecordList(filteredRecords);
    } catch (e) {
      console.log(e);
    } */
    },
    [ordersRecordList]
  );

  const handleUpdateClick = (e) => {
    e = e || window.event;
    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
      target = target.parentNode;
    }
    const index = target.getAttribute("dataid");
    setRecordToUpdateId(index);
    setShowUpdateModal(true);
  };

  const tableData = useMemo(
    () =>
      ordersRecordList?.map((listItem) => ({
        name: listItem?.name,
        company: listItem?.company?.label,
        status: listItem?.status?.label,
        amount: listItem?.amount,
        date: listItem?.date,
      })),
    [ordersRecordList]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Company",
        accessor: "company",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Delete/Update",
        Cell: () => (
          <div>
            <FontAwesomeIcon
              icon={faTrashAlt}
              color="red"
              onClick={() => handleDeleteClick()}
            />
            <FontAwesomeIcon
              icon={faPen}
              color="gray"
              onClick={() => handleUpdateClick()}
            />
          </div>
        ),
      },
    ],
    [handleDeleteClick]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  return (
    <section>
      <Modal
        show={showAddModal}
        onCancel={setShowAddModal}
        className=""
        header="Add new record"
        contentClass="additionalContentClass"
        footerClass="additionalFooterClass"
      >
        <AddOrdersRecordForm
          setShowAddModal={setShowAddModal}
          ordersRecordList={ordersRecordList}
          setOrdersRecordList={setOrdersRecordList}
        />
      </Modal>
      <Modal
        show={showUpdateModal}
        onCancel={setShowUpdateModal}
        className=""
        header="Update record"
        contentClass="additionalContentClass"
        footerClass="additionalFooterClass"
      >
        <UpdateOrdersRecordForm
          setShowUpdateModal={setShowUpdateModal}
          ordersRecordList={ordersRecordList}
          setOrdersRecordList={setOrdersRecordList}
          recordIndex={recordToUpdateId}
        />
      </Modal>
      <h2>Orders records</h2>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} dataid={ordersRecordList[i]?.id}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() => setShowAddModal(!showAddModal)}
        className="organization__add-button"
      >
        <FontAwesomeIcon icon={faPlus} size="1x" />
        Add Order Record
      </button>
    </section>
  );
};

export default Orders;
