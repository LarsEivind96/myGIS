import React from "react";
import "./Mission.css";

const ModalContent = (props) => {
  const { setShowMission, setAcceptedMission, acceptedMission, title } = props;

  return (
    <div className="ModalContent">
      <h1>{title}</h1>

      {acceptedMission ? (
        <div className="TextContainer" style={{ fontSize: "15px" }}>
          <p>
            Ethan Hunt has gotten himself caught by the enemy. We need your GIS expertise in order to save
            him. He has managed to send us a few hints of his whereabouts:
          </p>

          <ul>
            <li>
              The kidnappers went away for 10 minutes, and came back with a Bunnpris bag full of food. This
              means that a Bunnpris must be at most 150 metres away from me.
            </li>
            <li>The river, Nidelva, is at most 200 metres away from me.</li>
            <li>
              I can see the top of a church. It is more than 150 metres away from me, and less than 250 metres
              away from me.
            </li>
          </ul>
          <p>
            As always, should you be caught or killed, the Secretary will disavow any knowledge of your
            actions. Good luck, GIS Agent.
          </p>
        </div>
      ) : (
        <div className="TextContainer">
          <p>There you are... Finally. </p>
          <p>Your mission, should you choose to accept. </p>
        </div>
      )}

      {!acceptedMission && (
        <div className="ButtonContainer">
          <button
            onClick={() => {
              setShowMission(false);
            }}
          >
            Explore on my own
          </button>
          <button
            onClick={() => {
              setAcceptedMission(true);
            }}
          >
            I ACCEPT
          </button>
        </div>
      )}
    </div>
  );
};

export default ModalContent;
