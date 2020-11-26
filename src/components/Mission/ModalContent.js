import React, { useState } from "react";
import Colors from "../../constants/Colors";
import "./Mission.css";

const ModalContent = (props) => {
  const { setShowMission, setAcceptedMission, acceptedMission, title } = props;
  const [reply, setReply] = useState("");
  const [correct, setCorrect] = useState(false);

  const checkAnswer = (reply) => {
    if (reply.toLowerCase() === "Gløshaugen".toLowerCase()) {
      alert("Well Done");
    } else {
      alert("This is not correct.");
    }
  };

  return (
    <div className="ModalContent">
      <h1>{title}</h1>

      {!acceptedMission && (
        <div className="TextContainer">
          <p>There you are... Finally. </p>
          <p>Your mission, should you choose to accept. </p>
        </div>
      )}

      {acceptedMission && (
        <div className="TextContainer" style={{ fontSize: "15px" }}>
          <p>Ethan Hunt has gotten himself caught by the enemy</p>
          <ul>
            <li>I can see a church. It is at most 100 metres away from me</li>
            <li>
              I can hear cars driving around, so I know the highway must be in close proximity. At most 50
              metres
            </li>
            <li>
              I can hear either a tram or a train, but I can't tell which. It is at most 50 metres away from
              me.
            </li>
          </ul>
          <p>We need your GIS expertise in order to save him.</p>
          <p>
            As always, should you be caught or killed, the Secretary will disavow any knowledge of your
            actions. Good luck, Agent.
          </p>
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
      {acceptedMission && (
        <div className="InputContainer">
          <input placeholder="location" value={reply} onChange={(event) => setReply(event.target.value)} />
          <button
            onClick={() => {
              checkAnswer(reply);
            }}
          >
            CONFIRM
          </button>
        </div>
      )}
    </div>
  );
};

export default ModalContent;
