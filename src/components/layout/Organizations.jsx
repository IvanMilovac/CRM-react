import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt, faPen } from "@fortawesome/free-solid-svg-icons";
/* import { collection, doc, query, getDocs, deleteDoc } from "firebase/firestore"; */
import Modal from "../shared/Modal";
import AddOrganizationForm from "../components/AddOrganizationForm";
import UpdateOrganizationForm from "../components/UpdateOrganizationForm";
/* import { db } from "../../firebase-config"; */

import "./Organization.scss";

const Organizations = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [organizationsList, setOrganizationsList] = useState(
    JSON.parse(localStorage.getItem("orgsList")) || []
  );
  const [organizationToUpdateId, setOrganizationToUpdateId] = useState();

  useEffect(() => {
    /* 
    ****Fetch organization data from Firestore**** 
    const fetchOrganizations = async () => {
      const q = query(collection(db, "organizations"));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setOrganizationsList(data);
    };
    fetchOrganizations(); */
  }, [organizationsList]);

  const handleDeleteClick = useCallback(
    async (e) => {
      e = e || window.event;
      var target = e.srcElement || e.target;
      while (target && target.nodeName !== "TR") {
        target = target.parentNode;
      }
      const index = target.getAttribute("dataid");
      const filteredOrganizations = organizationsList.filter(
        (org) => org.id !== index
      );
      setOrganizationsList(filteredOrganizations);
      localStorage.setItem("orgsList", JSON.stringify(filteredOrganizations));
      /*
    ****Deleting organization from Firestore****
     try {
      await deleteDoc(doc(db, "organizations", index));
      setOrganizationsList(filteredOrganizations);
    } catch (e) {
      console.log(e);
    } */
    },
    [organizationsList]
  );

  const handleUpdateClick = (e) => {
    e = e || window.event;
    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
      target = target.parentNode;
    }
    const index = target.getAttribute("dataid");
    setOrganizationToUpdateId(index);
    setShowUpdateModal(true);
  };

  const tableData = useMemo(
    () =>
      organizationsList?.map((listItem) => ({
        name: listItem?.name,
        industry: listItem?.industry,
        contact: listItem?.contact,
        status: listItem?.status?.label,
      })),
    [organizationsList]
  );
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Industry",
        accessor: "industry",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Contact",
        accessor: "contact",
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
        header="Add organization"
        contentClass="additionalContentClass"
        footerClass="additionalFooterClass"
      >
        <AddOrganizationForm
          setShowAddModal={setShowAddModal}
          organizationsList={organizationsList}
          setOrganizationsList={setOrganizationsList}
        />
      </Modal>
      <Modal
        show={showUpdateModal}
        onCancel={setShowUpdateModal}
        className=""
        header="Update organization"
        contentClass="additionalContentClass"
        footerClass="additionalFooterClass"
      >
        <UpdateOrganizationForm
          setShowUpdateModal={setShowUpdateModal}
          organizationsList={organizationsList}
          setOrganizationsList={setOrganizationsList}
          orgIndex={organizationToUpdateId}
        />
      </Modal>
      <h2>Organizations</h2>
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
              <tr {...row.getRowProps()} dataid={organizationsList[i]?.id}>
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
        Add Organization
      </button>
    </section>
  );
};

export default Organizations;
