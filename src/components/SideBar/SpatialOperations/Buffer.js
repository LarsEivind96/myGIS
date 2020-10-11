import React, { useState } from "react";
import * as turf from "@turf/turf";
import Colors from "../../../constants/Colors";
import OperationHeader from "./minorComponents/OperationHeader";
import LayerSelect from "./minorComponents/LayerSelect";
import OperationButton from "./minorComponents/OperationButton";

const Buffer = (props) => {
  const { setTotalLayerSet, layersCopy } = props;
  const [radius, setRadius] = useState(5);
  const [chosenLayerId, setChosenLayerId] = useState(layersCopy[0].id);

  const performBuffer = (layer, radius) => {
    let bufferedLayer = JSON.parse(JSON.stringify(layer));
    bufferedLayer.source.data = turf.buffer(layer.source.data, radius, { units: "metres" });
    // Change id of the new layer
    bufferedLayer.id = bufferedLayer.id + `_${radius}m`;
    bufferedLayer.layout.visibility = "visible";
    if (layersCopy.findIndex((layer) => layer.id === bufferedLayer.id) !== -1) {
      alert("You have allready created this layer");
      return;
    } else {
      layersCopy.unshift(bufferedLayer);
      setTotalLayerSet(layersCopy);
    }
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
        operationHandler={() =>
          performBuffer(
            layersCopy.find((layer) => layer.id === chosenLayerId),
            radius
          )
        }
      />
    </div>
  );
};

export default Buffer;
