import React, { useState } from "react";
import * as turf from "@turf/turf";
import Colors from "../../../constants/Colors";
import OperationHeader from "./minorComponents/OperationHeader";
import LayerSelect from "./minorComponents/LayerSelect";
import OperationButton from "./minorComponents/OperationButton";

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
    let layer1Copy = JSON.parse(JSON.stringify(layer1));
    let layer2Copy = JSON.parse(JSON.stringify(layer2));
    layer1Copy.source.data = turf.union(layer1Copy.source.data, layer2Copy.source.data);
    // Change id of the new layer
    layer1Copy.id = layer1Copy.id + `_${layer2Copy.id}_union`;
    layer1Copy.layout.visibility = "visible";
    if (layersCopy.findIndex((layer) => layer.id === layer1Copy.id) !== -1) {
      alert("You have allready created this layer");
      return;
    }
    layersCopy.unshift(layer1Copy);
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
