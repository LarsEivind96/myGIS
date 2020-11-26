import React from "react";
import Colors from "../../../../constants/Colors";

const OperationButton = (props) => {
  return (
    <button
      className="OperationButton"
      style={{ backgroundColor: "white", color: Colors.primary, borderRadius: "5px" }}
      onClick={() => props.operationHandler()}
    >
      Go
    </button>
  );
};

export default OperationButton;
