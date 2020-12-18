import React, { useState } from "react";
import "./MainWrapper.css";
import Map from "../Map/Map";
import SideBar from "../SideBar/SideBar";
import allLayers from "../../datasets/layers";
import Colors from "../../constants/Colors";
import Mission from "../Mission/Mission";

function MainWrapper() {
  const [totalLayerSet, setTotalLayerSet] = useState(allLayers);
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [deletedLayerId, setDeletedLayerId] = useState("");
  const [showMission, setShowMission] = useState(true);

  return (
    <div className="mainContainer">
      <Mission showMission={showMission} setShowMission={setShowMission} />

      {!sideBarOpen && !showMission && (
        <button
          style={{ backgroundColor: Colors.secondary, color: Colors.text, fontSize: "32px" }}
          className="ToggleSideBar"
          onClick={() => {
            setSideBarOpen(true);
          }}
        >
          &#x2630;
        </button>
      )}
      {sideBarOpen && !showMission && (
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
