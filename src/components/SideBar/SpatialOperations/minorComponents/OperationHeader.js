import React from "react";
import Colors from "../../../../constants/Colors";

const OperationHeader = (props) => {
  let { operation, helpTip } = props;
  return (
    <div className="OperationHeader">
      <p style={{ fontSize: "13px", margin: "0", fontWeight: "bold", color: Colors.text }}>{operation}</p>
      <div className="HelpTip" style={{ backgroundColor: Colors.button }}>
        <p>{helpTip}</p>
      </div>
    </div>
  );
};

export default OperationHeader;
