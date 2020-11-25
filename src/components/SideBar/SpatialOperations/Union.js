import React, { useState } from "react";
import * as turf from "@turf/turf";
import Colors from "../../../constants/Colors";
import OperationHeader from "./minorComponents/OperationHeader";
import LayerSelect from "./minorComponents/LayerSelect";
import OperationButton from "./minorComponents/OperationButton";
import { createPolygonLayer } from "../../../datasets/layers";

const Union = (props) => {
  const { setTotalLayerSet, layersCopy } = props;
  const polygonLayers = layersCopy.filter((layer) => {
    //console.log(layer);

    return (
      layer.source.data.geometry.type === "Polygon" || layer.source.data.geometry.type === "MultiPolygon"
    );
  });
  const [chosenLayerId, setChosenLayerId] = useState(polygonLayers[0].id);
  const [chosenLayerId2, setChosenLayerId2] = useState(polygonLayers[0].id);

  const performUnion = (layer1, layer2) => {
    if (layer1.id === layer2.id) {
      alert("You need to choose two different layers, in order to perform Union");
      return;
    }
    let unionData = turf.union(layer1.source.data, layer2.source.data);
    // Change id of the new layer
    let newID = `${layer1.id}_${layer2.id}_UNI`;

    if (layersCopy.findIndex((layer) => layer.id === newID) !== -1) {
      alert("You have allready created this layer");
      return;
    }

    let unionPolygon = createPolygonLayer(unionData, newID, true);

    layersCopy.unshift(unionPolygon);
    setTotalLayerSet(layersCopy);
  };

  return (
    <div className="OperationContainer" style={{ backgroundColor: Colors.secondary, color: Colors.text }}>
      <div className="OperationSettings">
        <OperationHeader
          operation={"U N I O N"}
          helpTip={"Takes two polygons and returns a combined polygon."}
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
          performUnion(
            polygonLayers.find((layer) => layer.id === chosenLayerId),
            polygonLayers.find((layer) => layer.id === chosenLayerId2)
          )
        }
      />
    </div>
  );
};

export default Union;
