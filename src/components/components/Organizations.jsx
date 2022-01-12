import React, { useState, useEffect } from "react";
import Modal from "../shared/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddOrganizationForm from "./AddOrganizationForm";
import { collection, getDocs } from "firebase/firestore";
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
      {organizationsList.map((organization) => (
        <p key={organization.id}>{organization.name}</p>
      ))}
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
