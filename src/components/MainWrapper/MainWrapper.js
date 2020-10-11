import React, { useState } from "react";
import "./MainWrapper.css";
import Map from "../Map/Map";
import SideBar from "../SideBar/SideBar";
import allLayers from "../../datasets/layers";
import Colors from "../../constants/Colors";

function MainWrapper() {
  const [totalLayerSet, setTotalLayerSet] = useState(allLayers);
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [deletedLayerId, setDeletedLayerId] = useState("");

  return (
    <div className="mainContainer">
      {!sideBarOpen && (
        <button
          style={{ backgroundColor: Colors.primary, color: Colors.secondary }}
          className="ToggleSideBar"
          onClick={() => {
            setSideBarOpen(true);
          }}
        >
          &#x2630;
        </button>
      )}
      {sideBarOpen && (
        <div className="sideBarContainer" style={{ backgroundColor: Colors.primary }}>
          <SideBar
            totalLayerSet={totalLayerSet}
            setTotalLayerSet={setTotalLayerSet}
            setSideBarOpen={setSideBarOpen}
            sideBarOpen={sideBarOpen}
            setDeletedLayerId={setDeletedLayerId}
          />
        </div>
      )}
      <div className="mapContainer">
        <Map
          allLayers={totalLayerSet}
          deletedLayerId={deletedLayerId}
          setDeletedLayerId={setDeletedLayerId}
        />
      </div>
    </div>
  );
}

export default MainWrapper;
