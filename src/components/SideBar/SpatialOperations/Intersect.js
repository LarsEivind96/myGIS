import React, { useState } from "react";
import * as turf from "@turf/turf";
import intersect from "@turf/intersect";
import Colors from "../../../constants/Colors";
import OperationHeader from "./minorComponents/OperationHeader";
import LayerSelect from "./minorComponents/LayerSelect";
import OperationButton from "./minorComponents/OperationButton";
import { createPolygonLayer } from "../../../datasets/layers";

const convertToListOfPolygons = (polygon) => {
  if (polygon.source.data.geometry.type === "MultiPolygon") {
    return polygon.source.data.geometry.coordinates.map((c) => turf.polygon(c));
  } else {
    return [polygon.source.data];
  }
};

const Intersect = (props) => {
  const { setTotalLayerSet, layersCopy } = props;
  const polygonLayers = layersCopy.filter((layer) => {
    //console.log(layer);

    return (
      layer.source.data.geometry.type === "Polygon" || layer.source.data.geometry.type === "MultiPolygon"
    );
  });
  const [chosenLayerId, setChosenLayerId] = useState(polygonLayers[0].id);
  const [chosenLayerId2, setChosenLayerId2] = useState(polygonLayers[1].id);

  const performIntersect = (layer1, layer2) => {
    // Must choose two separate layers to perform Intersect..
    if (layer1.id === layer2.id) {
      alert("You need to choose two different layers, in order to perform Intersect");
      return;
    }

    let pieces1 = convertToListOfPolygons(layer1);
    let pieces2 = convertToListOfPolygons(layer2);

    let intersectedPolygons = [];
    for (let i = 0; i < pieces1.length; i++) {
      for (let j = 0; j < pieces2.length; j++) {
        let data = intersect(pieces1[i], pieces2[j]);
        console.log("Piece1: ", pieces1[i]);
        console.log("Piece2: ", pieces2[j]);
        console.log(data);
        if (data !== null) {
          intersectedPolygons.push(data.geometry.coordinates);
        }
      }
    }

    console.log("intersected polygons: ", intersectedPolygons);

    // If the intersect operation returns null..
    if (intersectedPolygons.length <= 0) {
      alert("This couldn't be done.. (Length of intersect returned null)");
      return;
    }

    let polygon;
    if (intersectedPolygons.length === 1) {
      if (intersectedPolygons[0].length === 1) {
        polygon = turf.polygon(intersectedPolygons[0]);
      } else {
        polygon = turf.multiPolygon(intersectedPolygons[0]);
      }
    } else {
      polygon = turf.multiPolygon(intersectedPolygons);
    }
    let newID = `${layer1.id}_${layer2.id}_ISCT`;

    if (layersCopy.findIndex((layer) => newID === layer.id) !== -1) {
      alert("You have allready created this layer");
      return;
    }

    const IntersectedLayer = createPolygonLayer(polygon, newID, true);

    layersCopy.unshift(IntersectedLayer);
    setTotalLayerSet(layersCopy);

    /*let intersectedData = turf.intersect(layer1Copy.source.data, layer2Copy.source.data);

    layer1Copy.source.data = intersectedData;

    // Change id of the new layer
    layer1Copy.id = layer1Copy.id + `_${layer2Copy.id}_intersect`;
    layer1Copy.layout.visibility = "visible";
    if (layersCopy.findIndex((layer) => layer.id === layer1Copy.id) !== -1) {
      alert("You have allready created this layer");
      return;
    }
    layersCopy.unshift(layer1Copy);
    setTotalLayerSet(layersCopy);*/
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
