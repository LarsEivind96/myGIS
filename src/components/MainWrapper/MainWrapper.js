import React, { useState } from "react";
import "./MainWrapper.css";
import Map from "../Map/Map";
import SideBar from "../SideBar/SideBar";
import allLayers from "../../datasets/layers";

function MainWrapper() {
  const [totalLayerSet, setTotalLayerSet] = useState(allLayers);

  return (
    <div className="mainContainer">
      <div className="sideBarContainer">
        <SideBar totalLayerSet={totalLayerSet} setTotalLayerSet={setTotalLayerSet} />
      </div>
      <div className="mapContainer">
        <Map allLayers={totalLayerSet} />
      </div>
    </div>
  );
}

export default MainWrapper;
