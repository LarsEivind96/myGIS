import React from "react";
import Colors from "../../../../constants/Colors";

const OperationButton = (props) => {
  return (
    <button
      className="OperationButton"
      style={{ backgroundColor: Colors.button, color: Colors.text, borderRadius: "5px" }}
      onClick={() => props.operationHandler()}
    >
      Go
    </button>
  );
};

export default OperationButton;
