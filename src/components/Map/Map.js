import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibGFyc2lib3kiLCJhIjoiY2s2amd6MmVvMDRxeDNubW40bGwwenNpbCJ9.i9ENV59BhjJShYuUBgoj0g";

const Map = (props) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  let { allLayers, deletedLayerId, setDeletedLayerId } = props;

  useEffect(() => {
    const attachMap = ({ setMap, mapContainer }) => {
      if (!mapContainer.current) {
        return;
      }
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: [10.39, 63.425],
        zoom: 13,
        attributionControl: false,
      });

      newMap.on("load", () => {
        // Add layers to map after map has loaded
        allLayers.forEach((layer) => {
          newMap.addLayer(layer);
        });
        setMap(newMap);
        newMap.resize();
      });

      // Add zoom control
      var nav = new mapboxgl.NavigationControl();
      newMap.addControl(nav, "bottom-right");
    };
    !map && attachMap({ setMap, mapContainer });
  }, [map, allLayers]);

  useEffect(() => {
    if (map) {
      let lastLayer;
      let index = 0;
      allLayers.forEach((layer) => {
        // Adds layer to the map if not already included
        if (map.getLayer(layer.id) === undefined) {
          map.addLayer(layer);
        }

        // Updates visibility of each layer
        map.setLayoutProperty(layer.id, "visibility", layer.layout.visibility);

        map.setPaintProperty(layer.id, `${layer.type}-color`, layer.paint[`${layer.type}-color`]);

        // Rearranges the layers
        if (index === 0) {
          lastLayer = layer;
        } else {
          map.moveLayer(layer.id, lastLayer.id);
          lastLayer = layer;
        }
        index++;
      });
    }
  }, [map, allLayers]);

  useEffect(() => {
    if (map) {
      // Delete layer
      if (deletedLayerId !== "") {
        map.removeLayer(deletedLayerId);
        map.removeSource(deletedLayerId);
        setDeletedLayerId("");
        return;
      }
    }
  }, [map, deletedLayerId, setDeletedLayerId]);

  return <div className="map" ref={mapContainer} />;
};

export default Map;
