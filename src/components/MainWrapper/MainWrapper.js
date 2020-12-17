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
  //const [mapStyle, setMapStyle] = useState("dark-v10");

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
          // mapStyle={mapStyle}
        />
      </div>

      {/*
      <div className="LayerShift">
        <div style={LabelStyle}>Change Map Style</div>
        <select
          name="mapStyle"
          style={LayerSelect}
          onChange={(event) => {
            setMapStyle(event.target.value);
          }}
          value={mapStyle}
        >
          <option value="streets-v11">Streets</option>
          <option value="light-v10">Light</option>
          <option value="dark-v10">Dark</option>
          <option value="outdoors-v11">Outdoors</option>
          <option value="satellite-v9">Satellite</option>
        </select>
      </div>
       */}
    </div>
  );
}
/*
const LayerSelect = {
  borderRadius: "5px",
  marginTop: "2px",
  marginBottom: "2px",
  width: "100px",
};

const LabelStyle = {
  fontSize: "12px",
  margin: "0px",
  padding: "0px",
  color: "white",
};*/

export default MainWrapper;
