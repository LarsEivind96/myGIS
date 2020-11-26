import React from "react";
import Colors from "../../constants/Colors";
import Buffer from "./SpatialOperations/Buffer";
import Difference from "./SpatialOperations/Difference";
import Intersect from "./SpatialOperations/Intersect";
import Union from "./SpatialOperations/Union";

const OperationList = ({ totalLayerSet, setTotalLayerSet }) => {
  let layersCopy = [];
  totalLayerSet.forEach((element) => {
    layersCopy.push(element);
  });

  return (
    <div className="LayerContainer">
      <h3 style={{ color: Colors.textMain }}>Spatial Operations</h3>
      <Buffer layersCopy={layersCopy} setTotalLayerSet={setTotalLayerSet} />
      <Intersect layersCopy={layersCopy} setTotalLayerSet={setTotalLayerSet} />
      <Union layersCopy={layersCopy} setTotalLayerSet={setTotalLayerSet} />
      <Difference layersCopy={layersCopy} setTotalLayerSet={setTotalLayerSet} />
    </div>
  );
};

export default OperationList;
