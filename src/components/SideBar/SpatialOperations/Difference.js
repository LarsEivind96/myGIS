import React, { useState } from "react";
import * as turf from "@turf/turf";

import Colors from "../../../constants/Colors";
import OperationButton from "./minorComponents/OperationButton";
import LayerSelect from "./minorComponents/LayerSelect";
import OperationHeader from "./minorComponents/OperationHeader";
import { createPolygonLayer } from "../../../datasets/layers";

const Difference = (props) => {
  const { setTotalLayerSet, layersCopy } = props;

  const polygonLayers = layersCopy.filter((layer) => {
    return (
      layer.source.data.geometry.type === "Polygon" || layer.source.data.geometry.type === "MultiPolygon"
    );
  });

  const [chosenLayerId, setChosenLayerId] = useState(polygonLayers[0].id);
  const [chosenLayerId2, setChosenLayerId2] = useState(polygonLayers[0].id);

  const performDifference = (layer1, layer2) => {
    if (layer1.id === layer2.id) {
      alert("You need to choose two different layers, in order to perform Difference");
      return;
    }
    let differenceData = turf.difference(layer1.source.data, layer2.source.data);
    // Change id of the new layer
    let newID = layer1.id + `_${layer2.id}_DIFF`;

    let createdLayer = createPolygonLayer(differenceData, newID, true);

    if (layersCopy.findIndex((layer) => layer.id === newID) !== -1) {
      alert("You have allready created this layer");
      return;
    }

    layersCopy.unshift(createdLayer);
    setTotalLayerSet(layersCopy);
  };

  return (
    <div className="OperationContainer" style={{ backgroundColor: Colors.secondary, color: Colors.text }}>
      <div className="OperationSettings">
        <OperationHeader
          operation={"D I F F E R E N C E"}
          helpTip={"Finds the difference between two polygons by clipping the second polygon from the first."}
        />
        <LayerSelect
          chosenLayerId={chosenLayerId}
          setChosenLayerId={setChosenLayerId}
          layers={polygonLayers}
        />
        <LayerSelect
          chosenLayerId={chosenLayerId2}
          setChosenLayerId={setChosenLayerId2}
          layers={polygonLayers}
        />
      </div>
      <OperationButton
        operationHandler={() =>
          performDifference(
            polygonLayers.find((layer) => layer.id === chosenLayerId),
            polygonLayers.find((layer) => layer.id === chosenLayerId2)
          )
        }
      />
    </div>
  );
};

export default Difference;
