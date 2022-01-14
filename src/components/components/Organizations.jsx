import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { collection, doc, query, getDocs, deleteDoc } from "firebase/firestore";
import Modal from "../shared/Modal";
import AddOrganizationForm from "./AddOrganizationForm";
import { db } from "../../firebase-config";

import "./Organization.scss";

const Organizations = () => {
  const [showModal, setShowModal] = useState(false);
  const [organizationsList, setOrganizationsList] = useState([]);

  const handleClick = async (e) => {
    e = e || window.event;
    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
      target = target.parentNode;
    }
    const index = target.getAttribute("dataid");
    try {
      await deleteDoc(doc(db, "organizations", index));
      setOrganizationsList([]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      const q = query(collection(db, "organizations"));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOrganizationsList(data);
    };
    fetchOrganizations();
  }, [showModal, handleClick]);

  const tableData = useMemo(
    () =>
      organizationsList.map((listItem) => ({
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
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  return (
    <section>
      <Modal
        show={showModal}
        onCancel={setShowModal}
        className=""
        header="Add organization"
        contentClass="additionalContentClass"
        footerClass="additionalFooterClass"
      >
        <AddOrganizationForm setShowModal={setShowModal} />
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
                <td onClick={handleClick}>
                  <FontAwesomeIcon icon={faTrashAlt} color="red" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() => setShowModal(!showModal)}
        className="organization__add-button"
      >
        <FontAwesomeIcon icon={faPlus} size="1x" />
        Add Organization
      </button>
    </section>
  );
};

export default Organizations;
