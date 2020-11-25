import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
// import { gloshaugen } from "../../datasets/geoJSON";

mapboxgl.accessToken =
  "pk.eyJ1IjoibGFyc2lib3kiLCJhIjoiY2s2amd6MmVvMDRxeDNubW40bGwwenNpbCJ9.i9ENV59BhjJShYuUBgoj0g";

const Map = (props) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  let { allLayers, deletedLayerId, setDeletedLayerId, mapStyle } = props;

  useEffect(() => {
    const attachMap = ({ setMap, mapContainer }) => {
      if (!mapContainer.current) {
        return;
      }
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: [10.406, 63.418],
        zoom: 14,
        attributionControl: false,
      });

      newMap.on("load", () => {
        console.log("First: ", allLayers);

        // Add layers to map after map has loaded
        allLayers.forEach((layer) => {
          newMap.addLayer(layer);
          console.log(newMap.getLayer(layer.id).id);
        });
        setMap(newMap);
        newMap.resize();
      });

      // Add zoom control
      var nav = new mapboxgl.NavigationControl();
      newMap.addControl(nav, "bottom-right");
    };
    !map && attachMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (map) {
      //map.setStyle("mapbox://styles/mapbox/" + mapStyle);
      console.log("change layer");
    }
  }, [map, mapStyle]);

  useEffect(() => {
    if (map) {
      updateLayers();
    }
  }, [map, allLayers]);

  useEffect(() => {
    if (map) {
      // Delete layer
      if (deletedLayerId !== "") {
        console.log("Delete layer");
        console.log(map.getLayer(deletedLayerId));
        map.removeLayer(deletedLayerId);
        setDeletedLayerId("");
        return;
      }
    }
  }, [deletedLayerId, setDeletedLayerId]);

  const updateLayers = () => {
    console.log("Second: ", allLayers);
    let lastLayer;
    let index = 0;
    // Removes the chosen layer

    allLayers.forEach((layer) => {
      // Adds layer to the map if not already included
      if (map.getLayer(layer.id) === undefined) {
        map.addLayer(layer);
        console.log("Add layer");
      }
      console.log(map.getLayer(layer.id).id);

      // Updates visibility of each layer
      map.setLayoutProperty(layer.id, "visibility", layer.layout.visibility);

      // Rearranges the layers
      if (index === 0) {
        lastLayer = layer;
      } else {
        map.moveLayer(layer.id, lastLayer.id);
        lastLayer = layer;
      }
      index++;
    });
  };

  return <div className="map" ref={mapContainer} />;
};

export default Map;
