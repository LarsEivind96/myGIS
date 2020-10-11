import React from "react";
import Colors from "../../../../constants/Colors";

const OperationHeader = (props) => {
  let { operation, helpTip } = props;
  return (
    <div className="OperationHeader">
      <p style={{ fontSize: "12px", margin: "0", fontWeight: "bold" }}>{operation}</p>
      <div className="HelpTip" style={{ backgroundColor: Colors.primary }}>
        <p>{helpTip}</p>
      </div>
    </div>
  );
};

export default OperationHeader;
