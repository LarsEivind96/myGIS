import React, { useState } from "react";
import Colors from "../../constants/Colors";
import Modal from "react-modal";
import "./Mission.css";
import ModalContent from "./ModalContent";

Modal.setAppElement("#root");

const Mission = (props) => {
  const { showMission, setShowMission } = props;
  const [acceptedMission, setAcceptedMission] = useState(false);

  return (
    <div>
      <button
        style={{ backgroundColor: Colors.primary, color: Colors.secondary }}
        className="ShowMission"
        onClick={() => {
          setShowMission(true);
        }}
      >
        &#9873;
      </button>
      <Modal isOpen={showMission} onRequestClose={() => setShowMission(false)} style={customStyles}>
        {!acceptedMission && (
          <ModalContent
            setShowMission={setShowMission}
            setAcceptedMission={setAcceptedMission}
            acceptedMission={acceptedMission}
            title={"M I S S I O N"}
          />
        )}
        {acceptedMission && (
          <ModalContent
            setShowMission={setShowMission}
            setAcceptedMission={setAcceptedMission}
            acceptedMission={acceptedMission}
            title={"TOP SECRET"}
          />
        )}
      </Modal>
    </div>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "60%",
    width: "50%",
    backgroundColor: `${Colors.secondary}`,
    color: `${Colors.text}`,
    boxShadow: "0 6.5vw 2vw -5vw rgba(0, 0, 0, 0.5)",
  },
};

export default Mission;
