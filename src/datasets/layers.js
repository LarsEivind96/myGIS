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

const layer_gloshaugen = {
  id: "Gløshaugen",
  type: "fill",
  source: {
    type: "geojson",
    data: gloshaugen,
  },
  paint: {
    "fill-color": "#bf0933",
    "fill-opacity": 0.8,
  },
  layout: {
    visibility: "none",
  },
};
const layer_hoyskoleparken = {
  id: "Høyskoleparken",
  type: "fill",
  source: {
    type: "geojson",
    data: hoyskoleparken,
  },
  paint: {
    "fill-color": "#1053bc",
    "fill-opacity": 0.8,
  },
  layout: {
    visibility: "none",
  },
};

const layer_frimerket = {
  id: "Frimerket",
  type: "fill",
  source: {
    type: "geojson",
    data: frimerket,
  },
  paint: {
    "fill-color": "#0ba83f",
    "fill-opacity": 0.4,
  },
  layout: {
    visibility: "none",
  },
};

const layer_campusrunden = {
  id: "Campusrunden",
  type: "line",
  source: {
    type: "geojson",
    data: campusrunden,
  },
  paint: {
    "line-color": "#ff69b4",
    "line-width": 1,
  },
  layout: {
    visibility: "none",
  },
};

const layer_lille_campusrunden = {
  id: "Lille Campusrunden",
  type: "line",
  source: {
    type: "geojson",
    data: lilleCampusrunden,
  },
  paint: {
    "line-color": "#4b5acc",
    "line-width": 1,
  },
  layout: {
    visibility: "none",
  },
};

const layer_kantiner = {
  id: "Kantiner",
  type: "circle",
  source: {
    type: "geojson",
    data: kantiner,
  },
  paint: {
    "circle-color": "#4b5acc",
    "circle-radius": 5,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
  layout: {
    visibility: "none",
  },
};

const layer_parkering = {
  id: "Parkeringsplasser",
  type: "circle",
  source: {
    type: "geojson",
    data: parkering,
  },
  paint: {
    "circle-color": "#3eb975",
    "circle-radius": 5,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
  layout: {
    visibility: "none",
  },
};

const layer_bysykkelstativ = {
  id: "Bysykkelstativ",
  type: "circle",
  source: {
    type: "geojson",
    data: bysykkelstativ,
  },
  paint: {
    "circle-color": "#e23f04",
    "circle-radius": 5,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
  layout: {
    visibility: "none",
  },
};

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
