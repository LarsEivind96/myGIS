import React, { useState } from "react";
import { Buffer, Intersect } from "./SpatialOperations";

const OperationList = ({ totalLayerSet, setTotalLayerSet }) => {
  let layersCopy = [];
  totalLayerSet.forEach((element) => {
    layersCopy.push(element);
  });

  return (
    <div className="LayerContainer">
      <p>Spatial Operations</p>
      <BufferOperation layersCopy={layersCopy} setTotalLayerSet={setTotalLayerSet} />
      <IntersectOperation layersCopy={layersCopy} setTotalLayerSet={setTotalLayerSet} />
    </div>
  );
};

export default OperationList;

const BufferOperation = (props) => {
  const { setTotalLayerSet, layersCopy } = props;
  const [radius, setRadius] = useState(5);
  const [chosenLayerId, setChosenLayerId] = useState(layersCopy[0].id);

  const performBuffer = (layer, radius) => {
    let bufferedLayer = Buffer(layer, radius);
    if (layersCopy.findIndex((layer) => layer.id === bufferedLayer.id) !== -1) {
      alert("You have allready created this layer");
      return;
    } else {
      layersCopy.push(bufferedLayer);
      setTotalLayerSet(layersCopy);
    }
  };
  return (
    <div className="OperationContainer">
      <div className="OperationSettings">
        <p style={{ fontSize: "12px", margin: "0", fontWeight: "bold" }}>B U F F E R</p>
        <select onChange={(event) => setChosenLayerId(event.target.value)} value={chosenLayerId}>
          {layersCopy.map((layer) => (
            <option value={layer.id} key={layer.id}>
              {layer.id}
            </option>
          ))}
        </select>
        <label>
          <input
            type="number"
            id="quantity"
            min="5"
            max="500"
            step="5"
            value={radius}
            onChange={(event) => setRadius(event.target.value)}
          />
          m
        </label>
      </div>
      <button
        className="OperationButton"
        onClick={() =>
          performBuffer(
            layersCopy.find((layer) => layer.id === chosenLayerId),
            radius
          )
        }
      >
        Go
      </button>
    </div>
  );
};

const IntersectOperation = (props) => {
  const { setTotalLayerSet, layersCopy } = props;
  const polygonLayers = layersCopy.filter(
    (layer) =>
      layer.source.data.geometry.type === "Polygon" || layer.source.data.geometry.type === "MultiPolygon"
  );
  const [chosenLayerId, setChosenLayerId] = useState(polygonLayers[0].id);
  const [chosenLayerId2, setChosenLayerId2] = useState(polygonLayers[0].id);

  const performIntersect = (layer1, layer2) => {
    if (layer1.id === layer2.id) {
      alert("You need to choose two different layers, in order to perform Intersect");
      return;
    }
    let intersectedLayer = Intersect(layer1, layer2);
    if (layersCopy.findIndex((layer) => layer.id === intersectedLayer.id) !== -1) {
      alert("You have allready created this layer");
      return;
    }
    layersCopy.unshift(intersectedLayer);
    setTotalLayerSet(layersCopy);
  };
  return (
    <div className="OperationContainer">
      <div className="OperationSettings">
        <p style={{ fontSize: "12px", margin: "0", fontWeight: "bold" }}>I N T E R S E C T</p>
        <select onChange={(event) => setChosenLayerId(event.target.value)} value={chosenLayerId}>
          {polygonLayers.map((layer) => (
            <option value={layer.id} key={layer.id}>
              {layer.id}
            </option>
          ))}
        </select>
        <select onChange={(event) => setChosenLayerId2(event.target.value)} value={chosenLayerId2}>
          {polygonLayers.map((layer) => (
            <option value={layer.id} key={layer.id}>
              {layer.id}
            </option>
          ))}
        </select>
      </div>
      <button
        className="OperationButton"
        onClick={() =>
          performIntersect(
            polygonLayers.find((layer) => layer.id === chosenLayerId),
            polygonLayers.find((layer) => layer.id === chosenLayerId2)
          )
        }
      >
        Go
      </button>
    </div>
  );
};
