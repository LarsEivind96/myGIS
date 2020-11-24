import {
  gloshaugen,
  campusrunden,
  kantiner,
  hoyskoleparken,
  frimerket,
  parkering,
  bysykkelstativ,
  lilleCampusrunden,
} from "./geoJSON.js";

import { getRandomColor } from "../constants/Colors";

export const createPolygonLayer = (data, id, visible) => {
  return {
    id: id,
    type: "fill",
    source: {
      type: "geojson",
      data: data,
    },
    paint: {
      "fill-color": getRandomColor(),
      "fill-opacity": 0.6,
    },
    layout: {
      visibility: visible ? "visible" : "none",
    },
  };
};

export const createLineLayer = (data, id, visible) => {
  return {
    id: id,
    type: "line",
    source: {
      type: "geojson",
      data: data,
    },
    paint: {
      "line-color": getRandomColor(),
      "line-width": 1,
    },
    layout: {
      visibility: visible ? "visible" : "none",
    },
  };
};

export const createPointLayer = (data, id, visible) => {
  return {
    id: id,
    type: "circle",
    source: {
      type: "geojson",
      data: data,
    },
    paint: {
      "circle-color": getRandomColor(),
      "circle-radius": 5,
      "circle-stroke-width": 1,
      "circle-stroke-color": getRandomColor(),
    },
    layout: {
      visibility: visible ? "visible" : "none",
    },
  };
};

const layer_gloshaugen = createPolygonLayer(gloshaugen, "Gløshaugen", false);

const layer_hoyskoleparken = createPolygonLayer(hoyskoleparken, "Høyskoleparken", false);

const layer_frimerket = createPolygonLayer(frimerket, "Frimerket", false);

const layer_campusrunden = createLineLayer(campusrunden, "Campusrunden", false);

const layer_lille_campusrunden = createLineLayer(lilleCampusrunden, "Lille Campusrunden", false);

const layer_kantiner = createPointLayer(kantiner, "Kantiner", false);

const layer_parkering = createPointLayer(parkering, "Parkeringsplasser", false);

const layer_bysykkelstativ = createPointLayer(bysykkelstativ, "Bysykkelstativ", false);

const allLayers = [
  layer_gloshaugen,
  layer_campusrunden,
  layer_kantiner,
  layer_hoyskoleparken,
  layer_frimerket,
  layer_parkering,
  layer_bysykkelstativ,
  layer_lille_campusrunden,
];

export default allLayers;
