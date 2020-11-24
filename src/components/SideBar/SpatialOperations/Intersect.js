import React, { useState } from "react";
import * as turf from "@turf/turf";
import Colors from "../../../constants/Colors";
import OperationHeader from "./minorComponents/OperationHeader";
import LayerSelect from "./minorComponents/LayerSelect";
import OperationButton from "./minorComponents/OperationButton";

const Intersect = (props) => {
  const { setTotalLayerSet, layersCopy } = props;
  const polygonLayers = layersCopy.filter((layer) => {
    //console.log(layer);

    return (
      layer.source.data.geometry.type === "Polygon" || layer.source.data.geometry.type === "MultiPolygon"
    );
  });
  const [chosenLayerId, setChosenLayerId] = useState(polygonLayers[0].id);
  const [chosenLayerId2, setChosenLayerId2] = useState(polygonLayers[0].id);

  const performIntersect = (layer1, layer2) => {
    if (layer1.id === layer2.id) {
      alert("You need to choose two different layers, in order to perform Intersect");
      return;
    }
    let layer1Copy = JSON.parse(JSON.stringify(layer1));
    let layer2Copy = JSON.parse(JSON.stringify(layer2));
    layer1Copy.source.data = turf.intersect(layer1Copy.source.data, layer2Copy.source.data);
    // Change id of the new layer
    layer1Copy.id = layer1Copy.id + `_${layer2Copy.id}_intersect`;
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
          operation={"I N T E R S E C T"}
          helpTip={"Takes two polygons and returns their intersection (the area they have in common)."}
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
          performIntersect(
            polygonLayers.find((layer) => layer.id === chosenLayerId),
            polygonLayers.find((layer) => layer.id === chosenLayerId2)
          )
        }
      />
    </div>
  );
};

export default Intersect;
