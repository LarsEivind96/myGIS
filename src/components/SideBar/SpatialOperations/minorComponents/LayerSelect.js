import React from "react";
import Colors from "../../../../constants/Colors";

const LayerSelect = (props) => {
  let { chosenLayerId, setChosenLayerId, layers } = props;
  return (
    <select
      className="LayerSelect"
      style={{ color: Colors.secondary }}
      onChange={(event) => setChosenLayerId(event.target.value)}
      value={chosenLayerId}
    >
      {layers.map((layer) => (
        <option value={layer.id} key={layer.id}>
          {layer.id}
        </option>
      ))}
    </select>
  );
};

export default LayerSelect;
