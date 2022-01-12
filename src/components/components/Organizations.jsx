import React, { useState } from "react";
import Modal from "../shared/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddOrganizationForm from "./AddOrganizationForm";

const Organizations = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <section>
      <Modal
        show={showModal}
        onCancel={setShowModal}
        className=""
        header="Add organization"
        headerClass=""
        footerClass=""
      >
        <AddOrganizationForm setShowModal={setShowModal} />
      </Modal>
      <button
        onClick={() => setShowModal(!showModal)}
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          background: "transparent",
          border: 0,
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faPlus} size="3x" color="#000a" />
      </button>
    </section>
  );
};

export default Organizations;
