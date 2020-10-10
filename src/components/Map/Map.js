import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
// import { gloshaugen } from "../../datasets/geoJSON";

mapboxgl.accessToken =
  "pk.eyJ1IjoibGFyc2lib3kiLCJhIjoiY2s2amd6MmVvMDRxeDNubW40bGwwenNpbCJ9.i9ENV59BhjJShYuUBgoj0g";

const Map = (props) => {
  const mapContainer = useRef(null);
  let [map, setMap] = useState(null);

  useEffect(() => {
    const attachMap = (setMap, mapContainer) => {
      if (!mapContainer.current) {
        return;
      }
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [10.406, 63.418],
        zoom: 14,
        attributionControl: false,
      });

      map.on("load", () => {
        // Add layers to map after map has loaded
        props.allLayers.forEach((layer) => {
          map.addLayer(layer);
        });
        setMap(map);
        map.resize();
      });

      // Add zoom control
      var nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "bottom-right");
    };
    !map && attachMap(setMap, mapContainer);
  }, [map, props.allLayers]);

  useEffect(() => {
    if (map) {
      let lastLayer;
      let index = 0;
      props.allLayers.forEach((layer) => {
        // Adds layer to the map if not already included
        if (map.getLayer(layer.id) === undefined) {
          map.addLayer(layer);
        }
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
    }
  }, [map, props.allLayers]);

  return <div className="map" ref={mapContainer} />;
};

export default Map;
