import { gloshaugen, campusrunden, hoyskoleparken, Nidelva, kirker, Bunnpris, Fasit } from "./geoJSON.js";

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

const layer_gloshaugen = createPolygonLayer(gloshaugen, "Gløshaugen", true);

const layer_hoyskoleparken = createPolygonLayer(hoyskoleparken, "Høyskoleparken", true);

const layer_campusrunden = createLineLayer(campusrunden, "Campusrunden", true);

const layer_nidelva = createLineLayer(Nidelva, "Nidelva", true);

const layer_kirker = createPointLayer(kirker, "Kirker", true);

export const layer_fasit = createPolygonLayer(Fasit, "Fasit", false);

const layer_bunnpris = createPointLayer(Bunnpris, "Bunnpris", true);

const allLayers = [
  layer_gloshaugen,
  layer_hoyskoleparken,
  layer_campusrunden,
  layer_nidelva,
  layer_kirker,
  layer_bunnpris,
];

export default allLayers;
