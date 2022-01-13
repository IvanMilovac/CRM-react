import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs } from "firebase/firestore";
import Modal from "../shared/Modal";
import AddOrganizationForm from "./AddOrganizationForm";
import { db } from "../../firebase-config";

import "./Organization.scss";

const Organizations = () => {
  const [showModal, setShowModal] = useState(false);
  const [organizationsList, setOrganizationsList] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const querySnapshot = await getDocs(collection(db, "organizations"));
      const array = [];
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });
      setOrganizationsList(array);
    };
    fetchOrganizations();
  }, [showModal]);
  console.log(organizationsList);
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
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
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
