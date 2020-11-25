import React, { useState } from "react";
import buffer from "@turf/buffer";
import Colors from "../../../constants/Colors";
import { createPolygonLayer } from "../../../datasets/layers";
import OperationHeader from "./minorComponents/OperationHeader";
import LayerSelect from "./minorComponents/LayerSelect";
import OperationButton from "./minorComponents/OperationButton";

const Buffer = (props) => {
  const { setTotalLayerSet, layersCopy } = props;
  const [radius, setRadius] = useState(5);
  const [chosenLayerId, setChosenLayerId] = useState(layersCopy[0].id);

  const performBuffer = (layer) => {
    let bufferedData = buffer(layer.source.data, radius, { units: "metres" });
    // Change id of the new layer
    let newID = layer.id + `_${radius}m`;
    let createdLayer = createPolygonLayer(bufferedData, newID, true);
    if (layersCopy.findIndex((lyr) => lyr.id === newID) !== -1) {
      alert("You have allready created this layer");
      return;
    }
    // Adds the newly created layer to the beginning of the array
    layersCopy.unshift(createdLayer);
    setTotalLayerSet(layersCopy);
  };

  return (
    <div className="OperationContainer" style={{ backgroundColor: Colors.secondary, color: Colors.text }}>
      <div className="OperationSettings">
        <OperationHeader
          operation={"B U F F E R"}
          helpTip={"Creates a buffer around a layer for a given radius."}
        />
        <LayerSelect chosenLayerId={chosenLayerId} setChosenLayerId={setChosenLayerId} layers={layersCopy} />

        <label>
          <input
            className="Input"
            type="number"
            id="quantity"
            min="5"
            max="500"
            step="5"
            value={radius}
            onChange={(event) => setRadius(event.target.value)}
          />
          metres
        </label>
      </div>
      <OperationButton
        operationHandler={() => performBuffer(layersCopy.find((layer) => layer.id === chosenLayerId))}
      />
    </div>
  );
};

export default Buffer;
